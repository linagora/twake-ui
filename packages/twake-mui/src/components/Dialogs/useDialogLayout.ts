import {
  DialogActionsProps,
  DialogContentProps,
  DialogTitleProps,
  DividerProps,
  Grow
} from '@mui/material'
import { mergeSlotProps } from '@mui/material/utils'
import cx from 'classnames'
import React, { useId } from 'react'

import { useBreakpoints } from '../../hooks/useBreakpoints'
import type { DialogProps } from '../Dialog'
import SlideUpTransition from './SlideUpTransition'

export type DialogCloseReason = 'backdropClick' | 'escapeKeyDown'

export interface DialogLayoutComponentsProps {
  dialogTitle?: DialogTitleProps
  divider?: DividerProps
  dialogActions?: DialogActionsProps
  dialogContent?: DialogContentProps
}

export interface DialogLayoutProps extends Omit<
  DialogProps,
  'title' | 'content' | 'onClose'
> {
  /** Called without a reason when the close or back button is clicked */
  onClose?: (event: object, reason?: DialogCloseReason) => void
  /** Shows a back button. On full screen, it replaces the close button */
  onBack?: React.MouseEventHandler<HTMLButtonElement>
  align?: 'top' | 'middle'
  /** Lets the title run under the close and back buttons */
  disableTitleAutoPadding?: boolean
  /** Lets the title wrap and scroll with the content */
  isFluidTitle?: boolean
  /** Removes the paddings around the content */
  disableGutters?: boolean
  titleRef?: React.Ref<HTMLHeadingElement>
  /** CSS `background` of the dialog paper */
  background?: string
  componentsProps?: DialogLayoutComponentsProps
}

export interface DialogLayout {
  id: string
  fullScreen: boolean
  dialogProps: DialogProps
  dialogTitleProps: DialogTitleProps & { ref?: React.Ref<HTMLHeadingElement> }
  dividerProps: DividerProps
  dialogActionsProps: DialogActionsProps
  dialogContentProps: DialogContentProps
}

/** Computes the props of a dialog and of its parts, for dialogs laid out with a title, a content and actions */
export const useDialogLayout = ({
  size = 'medium',
  fullScreen: fullScreenProp,
  onClose,
  onBack,
  align,
  disableTitleAutoPadding,
  isFluidTitle,
  disableGutters,
  titleRef,
  background,
  componentsProps,
  classes,
  slots,
  slotProps,
  ...props
}: DialogLayoutProps): DialogLayout => {
  const { isMobile } = useBreakpoints()
  const id = useId()
  const fullScreen = fullScreenProp ?? (size !== 'small' && isMobile)
  const titleId = `modal-title-${id}`
  const hasCloseButton = !fullScreen && Boolean(onClose)
  const hasBackButton = Boolean(onBack) || (fullScreen && Boolean(onClose))

  return {
    id,
    fullScreen,
    dialogProps: {
      'aria-labelledby': titleId,
      ...props,
      size,
      fullScreen,
      onClose,
      classes: {
        ...classes,
        container: cx({ alignTop: align === 'top' }, classes?.container)
      },
      slots: {
        transition: fullScreen ? SlideUpTransition : Grow,
        ...slots
      },
      slotProps: {
        ...slotProps,
        paper: background
          ? mergeSlotProps(slotProps?.paper, { sx: { background } })
          : slotProps?.paper
      }
    },
    dialogTitleProps: {
      ...componentsProps?.dialogTitle,
      id: titleId,
      ref: titleRef,
      className: cx(
        {
          'u-ellipsis': !isFluidTitle,
          dialogTitleFluid: isFluidTitle,
          dialogTitleWithClose: hasCloseButton && !disableTitleAutoPadding,
          dialogTitleWithBack: hasBackButton && !disableTitleAutoPadding
        },
        componentsProps?.dialogTitle?.className
      )
    },
    dividerProps: {
      ...componentsProps?.divider,
      className: cx('dialogDivider', componentsProps?.divider?.className)
    },
    dialogActionsProps: {
      ...componentsProps?.dialogActions,
      className: cx('dialogActions', componentsProps?.dialogActions?.className)
    },
    dialogContentProps: {
      ...componentsProps?.dialogContent,
      className: cx(
        { disableGutters },
        componentsProps?.dialogContent?.className
      )
    }
  }
}
