import type { PDFDocument, PDFFont, PDFPage } from 'pdf-lib'

const A4_PAGE_SIZE: [number, number] = [595.28, 841.89]

const TEXT_PDF_CONFIG = {
  fontSize: 12,
  lineHeight: 16,
  marginX: 40,
  marginY: 40,
  pageSize: A4_PAGE_SIZE
}

export interface WrapTextToLinesOptions {
  font: PDFFont
  fontSize: number
  /** Max line width, in PDF units */
  maxLineWidth: number
  line: string
}

export const wrapTextToLines = ({
  font,
  fontSize,
  maxLineWidth,
  line
}: WrapTextToLinesOptions): string[] => {
  if (!line) return []
  if (fontSize <= 0 || maxLineWidth <= 0) return [line]

  return line.split(' ').reduce<string[]>((lines, word) => {
    const currentLine = lines.at(-1)

    if (currentLine === undefined) return [word]

    const testLine = `${currentLine} ${word}`

    if (font.widthOfTextAtSize(testLine, fontSize) <= maxLineWidth) {
      lines[lines.length - 1] = testLine
    } else {
      lines.push(word)
    }

    return lines
  }, [])
}

export interface PdfCursor {
  page: PDFPage
  y: number
}

export interface PushNewPageIfNeededOptions extends PdfCursor {
  pdfDoc: PDFDocument
  requiredHeight: number
  marginTop: number
  marginBottom: number
}

export const pushNewPageIfNeeded = ({
  pdfDoc,
  page,
  y,
  requiredHeight,
  marginTop,
  marginBottom
}: PushNewPageIfNeededOptions): PdfCursor => {
  if (y - requiredHeight >= marginBottom) return { page, y }

  const { width, height } = page.getSize()

  return {
    page: pdfDoc.addPage([width, height]),
    y: height - marginTop
  }
}

export interface DrawWrappedTextOptions extends PdfCursor {
  pdfDoc: PDFDocument
  text: string
  font: PDFFont
  fontSize: number
  lineHeight: number
  marginX: number
  /** Top and bottom margin */
  marginY: number
  /** Max line width, in PDF units */
  maxLineWidth: number
}

export const drawWrappedText = ({
  pdfDoc,
  page,
  y,
  text,
  font,
  fontSize,
  lineHeight,
  marginX,
  marginY,
  maxLineWidth
}: DrawWrappedTextOptions): PdfCursor => {
  let cursor: PdfCursor = { page, y }

  for (const paragraph of text.split(/\r?\n/)) {
    for (const line of wrapTextToLines({
      font,
      fontSize,
      maxLineWidth,
      line: paragraph
    })) {
      cursor = pushNewPageIfNeeded({
        pdfDoc,
        ...cursor,
        requiredHeight: lineHeight,
        marginTop: marginY,
        marginBottom: marginY
      })

      cursor.page.drawText(line, {
        x: marginX,
        y: cursor.y - fontSize,
        size: fontSize,
        font
      })

      cursor = { ...cursor, y: cursor.y - lineHeight }
    }

    cursor = { ...cursor, y: cursor.y - lineHeight / 2 }
  }

  return cursor
}

/** Creates an A4 PDF from a plain text */
export const makePdfBlobFromText = async (text: string): Promise<Blob> => {
  const { PDFDocument, StandardFonts } = await import('pdf-lib')
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const { fontSize, lineHeight, marginX, marginY, pageSize } = TEXT_PDF_CONFIG

  drawWrappedText({
    pdfDoc,
    page: pdfDoc.addPage(pageSize),
    y: pageSize[1] - marginY,
    text,
    font,
    fontSize,
    lineHeight,
    marginX,
    marginY,
    maxLineWidth: pageSize[0] - marginX * 2
  })

  const pdfBytes = await pdfDoc.save()

  return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
}
