import React from 'react'

import DialogBackButton from './DialogBackButton'
import DialogCloseButton from './DialogCloseButton'
import type { DialogLayoutProps } from './useDialogLayout'

export interface DialogNavButtonsProps extends Pick<
  DialogLayoutProps,
  'onClose' | 'onBack'
> {
  id: string
  fullScreen: boolean
}

/** Close and back buttons of a dialog. On full screen, a single back button calls `onBack`, or `onClose` without it */
const DialogNavButtons = ({
  id,
  fullScreen,
  onClose,
  onBack
}: DialogNavButtonsProps): React.ReactElement | null => {
  const onBackOrClose = onBack ?? onClose

  if (fullScreen) {
    return onBackOrClose ? (
      <DialogBackButton
        onClick={onBackOrClose}
        data-testid={`modal-backclose-button-${id}`}
      />
    ) : null
  }

  return (
    <>
      {onClose && (
        <DialogCloseButton
          onClick={onClose}
          data-testid={`modal-close-button-${id}`}
        />
      )}
      {onBack && (
        <DialogBackButton
          onClick={onBack}
          data-testid={`modal-back-button-${id}`}
        />
      )}
    </>
  )
}

export default DialogNavButtons
