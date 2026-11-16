import { DialogContent, DialogTitle, List } from '@mui/material'
import cx from 'classnames'
import React, { createContext, useContext } from 'react'

import Dialog from '../Dialog'
import DialogNavButtons from '../Dialogs/DialogNavButtons'
import {
  DialogLayout,
  DialogLayoutProps,
  useDialogLayout
} from '../Dialogs/useDialogLayout'
import NestedSelect from './index'
import type { NestedSelectHeaderProps, NestedSelectProps } from './types'

export interface NestedSelectModalProps extends NestedSelectProps {
  onClose?: DialogLayoutProps['onClose']
}

interface DialogLayoutContextValue extends DialogLayout {
  onClose?: DialogLayoutProps['onClose']
}

// NestedSelect renders the header and the content as components, so they read the layout here
const DialogLayoutContext = createContext<DialogLayoutContextValue | null>(null)

const useDialogLayoutContext = (): DialogLayoutContextValue => {
  const layout = useContext(DialogLayoutContext)
  if (!layout) throw new Error('Rendered outside NestedSelectModal')
  return layout
}

const NestedSelectDialogHeader = ({
  title,
  showBack,
  onClickBack
}: NestedSelectHeaderProps): React.ReactElement => {
  const { id, fullScreen, onClose, dialogTitleProps } = useDialogLayoutContext()

  return (
    <>
      <DialogNavButtons
        id={id}
        fullScreen={fullScreen}
        onClose={onClose}
        onBack={showBack ? onClickBack : undefined}
      />
      {title && (
        <DialogTitle
          {...dialogTitleProps}
          className={cx(dialogTitleProps.className, {
            dialogTitleWithBack: showBack
          })}
        >
          {title}
        </DialogTitle>
      )}
    </>
  )
}

const NestedSelectDialogContent = ({
  children
}: {
  children?: React.ReactNode
}): React.ReactElement => {
  const { dialogContentProps } = useDialogLayoutContext()

  return (
    <DialogContent {...dialogContentProps}>
      <List>{children}</List>
    </DialogContent>
  )
}

/** NestedSelect in a dialog, with a back button to the parent list */
const NestedSelectModal = ({
  onClose,
  ...props
}: NestedSelectModalProps): React.ReactElement => {
  const layout = useDialogLayout({ open: true, onClose, disableGutters: true })

  return (
    <Dialog {...layout.dialogProps}>
      <DialogLayoutContext.Provider value={{ ...layout, onClose }}>
        <NestedSelect
          HeaderComponent={NestedSelectDialogHeader}
          ContentComponent={NestedSelectDialogContent}
          {...props}
        />
      </DialogLayoutContext.Provider>
    </Dialog>
  )
}

export default NestedSelectModal
