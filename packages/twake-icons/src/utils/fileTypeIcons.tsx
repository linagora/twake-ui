import {
  File,
  FileTypeAudio,
  FileTypeCode,
  FileTypeImage,
  FileTypePdf,
  FileTypeSheet,
  FileTypeSlide,
  FileTypeText,
  FileTypeVideo,
  FileTypeZip
} from '../Icons'

/**
 * Maps MIME types to their corresponding icon components
 */
export const mimeToIcon: Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  // PDF
  'application/pdf': FileTypePdf,

  // Images
  'image/png': FileTypeImage,
  'image/jpeg': FileTypeImage,
  'image/jpg': FileTypeImage,
  'image/gif': FileTypeImage,
  'image/webp': FileTypeImage,
  'image/svg+xml': FileTypeImage,
  'image/bmp': FileTypeImage,
  'image/tiff': FileTypeImage,

  // Documents - Word
  'application/msword': FileTypeText,
  'application/rtf': FileTypeText,
  'application/vnd.oasis.opendocument.text': FileTypeText,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    FileTypeText,

  // Documents - Excel/Sheets
  'application/vnd.ms-excel': FileTypeSheet,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    FileTypeSheet,

  'application/vnd.oasis.opendocument.spreadsheet': FileTypeSheet,
  'text/csv': FileTypeSheet,

  // Documents - PowerPoint/Slides
  'application/vnd.ms-powerpoint': FileTypeSlide,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    FileTypeSlide,

  'application/vnd.oasis.opendocument.presentation': FileTypeSlide,

  // Text files
  'text/plain': FileTypeText,
  'text/html': FileTypeCode,
  'text/css': FileTypeCode,
  'text/javascript': FileTypeCode,
  'text/jsx': FileTypeCode,
  'application/json': FileTypeCode,
  'application/xml': FileTypeCode,

  // Archives
  'application/zip': FileTypeZip,
  'application/x-zip-compressed': FileTypeZip,
  'application/x-rar-compressed': FileTypeZip,
  'application/vnd.rar': FileTypeZip,
  'application/x-7z-compressed': FileTypeZip,
  'application/gzip': FileTypeZip,
  'application/x-tar': FileTypeZip,

  // Video
  'video/mp4': FileTypeVideo,
  'video/webm': FileTypeVideo,
  'video/ogg': FileTypeVideo,
  'video/quicktime': FileTypeVideo,
  'video/x-msvideo': FileTypeVideo,
  'video/x-matroska': FileTypeVideo,
  'video/mpeg': FileTypeVideo,

  // Audio
  'audio/mpeg': FileTypeAudio,
  'audio/mp3': FileTypeAudio,
  'audio/wav': FileTypeAudio,
  'audio/ogg': FileTypeAudio,
  'audio/webm': FileTypeAudio,
  'audio/aac': FileTypeAudio,
  'audio/flac': FileTypeAudio,
  'audio/x-flac': FileTypeAudio
}

/**
 * Default fallback icon when no specific icon is found
 */
export const defaultIcon = File
