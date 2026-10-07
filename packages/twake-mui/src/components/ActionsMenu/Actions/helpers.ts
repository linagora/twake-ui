import type { PDFDocument } from 'pdf-lib'

import {
  ActionDocument,
  ActionFactory,
  ActionObject,
  GenerateWebLink,
  WebLinkClient
} from '../types'

// Should guarantee good resolution for different uses (printing, downloading, etc.)
const MAX_RESIZE_IMAGE_SIZE = 3840
const MAX_IMAGE_SIDE_SIZE = 1920

/** Builds every action with the same options, skipping falsy entries */
export const makeActions = <Options extends object>(
  actions: (ActionFactory<Options> | false | null | undefined)[] = [],
  options?: Options
): ActionObject[] => {
  // SAFETY: a factory that needs options reads them as its own contract
  const factoryOptions = options ?? ({} as Options)

  return actions
    .filter((actionFn): actionFn is ActionFactory<Options> => !!actionFn)
    .map(actionFn => {
      const action = actionFn(factoryOptions)
      const name = action.name || actionFn.name

      return { [name]: action }
    })
}

export interface AppWebLinkOptions {
  client: WebLinkClient
  generateWebLink: GenerateWebLink
  slug: string
  hash: string
}

export const makeAppWebLink = ({
  client,
  generateWebLink,
  slug,
  hash
}: AppWebLinkOptions): string => {
  return generateWebLink({
    slug,
    cozyUrl: client.getStackClient().uri,
    subDomainType: client.getInstanceOptions().subdomain,
    pathname: '/',
    hash
  })
}

const readFileAs = (
  file: Blob,
  method: 'readAsDataURL' | 'readAsArrayBuffer'
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (): void => resolve(reader.result)
    reader[method](file)
  })
}

export const makeBase64FromFile = async (
  file: Blob
): Promise<string | null> => {
  const result = await readFileAs(file, 'readAsDataURL')

  return typeof result === 'string' ? result : null
}

const computeImageScaleRatio = (image: HTMLImageElement): number => {
  const longerSideSizeInPixel = Math.max(image.height, image.width)

  return MAX_RESIZE_IMAGE_SIZE < longerSideSizeInPixel
    ? MAX_RESIZE_IMAGE_SIZE / longerSideSizeInPixel
    : 1
}

const resizeImage = (fileDataUri: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = fileDataUri
    image.onerror = reject
    image.onload = (): void => {
      const canvas = document.createElement('canvas')
      const scaleRatio = computeImageScaleRatio(image)
      const scaledWidth = scaleRatio * image.width
      const scaledHeight = scaleRatio * image.height
      const quality =
        scaledWidth >= MAX_IMAGE_SIDE_SIZE ||
        scaledHeight >= MAX_IMAGE_SIDE_SIZE
          ? 0.35
          : 0.75

      canvas.width = scaledWidth
      canvas.height = scaledHeight
      canvas.getContext('2d')?.drawImage(image, 0, 0, scaledWidth, scaledHeight)

      resolve(canvas.toDataURL('image/jpeg', quality))
    }
  })
}

const addImageToPdf = async (
  pdfDoc: PDFDocument,
  file: Blob
): Promise<void> => {
  const fileDataUri = await makeBase64FromFile(file)
  if (fileDataUri === null) throw new Error('Cannot read the image file')

  const resizedImage = await resizeImage(fileDataUri)
  const img = await pdfDoc.embedJpg(resizedImage)

  const page = pdfDoc.addPage([img.width, img.height])
  const { width: pageWidth, height: pageHeight } = page.getSize()
  page.drawImage(img, {
    x: pageWidth / 2 - img.width / 2,
    y: pageHeight / 2 - img.height / 2,
    width: img.width,
    height: img.height
  })
}

export const fileToArrayBuffer = async (
  file: Blob
): Promise<ArrayBuffer | Uint8Array> => {
  if ('arrayBuffer' in file) return await file.arrayBuffer()

  const result = await readFileAs(file, 'readAsArrayBuffer')
  if (!(result instanceof ArrayBuffer)) {
    throw new Error('Cannot read the file')
  }

  return new Uint8Array(result)
}

const addPdfToPdf = async (pdfDoc: PDFDocument, file: Blob): Promise<void> => {
  const { PDFDocument } = await import('pdf-lib')
  const pdfToAdd = await fileToArrayBuffer(file)
  const document = await PDFDocument.load(pdfToAdd)
  const copiedPages = await pdfDoc.copyPages(
    document,
    document.getPageIndices()
  )
  copiedPages.forEach(page => pdfDoc.addPage(page))
}

/** Adds a PDF or an image file to the document, and returns its bytes */
export const addFileToPdf = async (
  pdfDoc: PDFDocument,
  file: Blob
): Promise<Uint8Array> => {
  if (file.type === 'application/pdf') {
    await addPdfToPdf(pdfDoc, file)
  } else {
    await addImageToPdf(pdfDoc, file)
  }

  return await pdfDoc.save()
}

export type FetchBlobFileById<Client> = (
  client: Client,
  id: string
) => Promise<Blob>

export interface MakePdfBlobOptions<Client> {
  client: Client
  docs: ActionDocument[]
  fetchBlobFileById: FetchBlobFileById<Client>
}

/** Fetches the files of the docs and merges them into a single PDF */
export const makePdfBlob = async <Client>({
  client,
  docs,
  fetchBlobFileById
}: MakePdfBlobOptions<Client>): Promise<Blob> => {
  const { PDFDocument } = await import('pdf-lib')
  const pdfDoc = await PDFDocument.create()

  for (const doc of docs) {
    const blob = await fetchBlobFileById(client, doc._id)
    await addFileToPdf(pdfDoc, blob)
  }

  const pdfBytes = await pdfDoc.save()

  return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
}

export const downloadBlob = (blob: Blob | null, filename: string): boolean => {
  if (!blob || !filename) return false

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()

  return true
}
