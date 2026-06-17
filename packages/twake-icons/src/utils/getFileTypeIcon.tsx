import { lookup } from 'mime-types'
import React from 'react'

import { mimeToIcon, defaultIcon } from './fileTypeIcons'

/**
 * Returns the appropriate icon component for a given attachment
 * Tries MIME type first, then falls back to filename lookup
 * @param filename - The complete filename with the extension
 * @param mimeType - The mime type of the file
 * @returns React node representing the file type icon
 */
export function getFileTypeIcon(
  filename: string,
  mimeType?: string
): (props: React.SVGProps<SVGSVGElement>) => JSX.Element {
  const resolvedMimeType =
    mimeType?.split(';')[0].trim().toLowerCase() || lookup(filename)

  if (resolvedMimeType && mimeToIcon[resolvedMimeType]) {
    return mimeToIcon[resolvedMimeType]
  }

  return defaultIcon
}
