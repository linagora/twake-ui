import { Box, Portal } from '@mui/material'
import React, { type FC } from 'react'

// A frame over the whole page, under TwakeSpace's own dialogs, that only
// shows and takes clicks within `clipPath`: the browser does not hit test
// what a clip path cuts out, so the page under it stays usable.
export interface OverlayFrameProps {
  /** `<name of the app's frame>:overlay`, the name the app looks for */
  name: string
  /** `/embed/overlay.html` on the app's origin */
  src: string
  title: string
  /** The same as the app's frame */
  sandbox: string
  allow: string
  /** From `overlayClipPath` */
  clipPath: string
}

export const OverlayFrame: FC<OverlayFrameProps> = ({
  name,
  src,
  title,
  sandbox,
  allow,
  clipPath
}) => {
  const empty = clipPath.startsWith('inset(')

  return (
    <Portal>
      <Box
        component="iframe"
        name={name}
        src={src}
        title={title}
        sandbox={sandbox}
        allow={allow}
        aria-hidden={empty || undefined}
        tabIndex={empty ? -1 : undefined}
        // Inline: it changes with every move of a menu, a class per value
        // would pile up
        style={{ clipPath }}
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 0,
          background: 'transparent',
          // A frame whose colour scheme differs from the page is painted opaque
          colorScheme: 'normal',
          zIndex: theme => theme.zIndex.modal - 1
        }}
      />
    </Portal>
  )
}
