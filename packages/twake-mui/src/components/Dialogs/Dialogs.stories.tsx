import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import {
  Attachment,
  Cloud,
  Dots,
  Icon,
  Pen,
  People
} from '@linagora/twake-icons'

import AlertProvider from '../../providers/AlertProvider'
import { useAlert } from '../../providers/AlertProvider/useAlert'
import BottomSheet from '../BottomSheet'
import BottomSheetItem from '../BottomSheet/BottomSheetItem'
import type { DialogSize } from '../Dialog'
import ListItemText from '../ListItemText'
import ConfirmDialog from './ConfirmDialog'
import FixedActionsDialog from './FixedActionsDialog'
import FixedDialog from './FixedDialog'
import IllustrationDialog from './IllustrationDialog'
import PermissionDialog from './PermissionDialog'
import StandardDialog, { StandardDialogProps } from './StandardDialog'

const sizes: DialogSize[] = ['small', 'medium', 'large', 'full']

const SHORT_TEXT =
  'Ada Lovelace was an English mathematician and writer, chiefly known for her work on the Analytical Engine.'

const LONG_TEXT = Array.from(
  { length: 8 },
  () =>
    `${SHORT_TEXT} She was the first to recognise that the machine had applications beyond pure calculation, and published the first algorithm intended to be carried out by such a machine. As a result, she is often regarded as the first computer programmer.`
).join('\n\n')

const BACKGROUND =
  'linear-gradient(to bottom, rgba(41, 127, 242, 0.24), transparent 160px)'

const noop = (): void => undefined

const PermissionDialogExample: React.FC<StandardDialogProps> = ({
  open,
  title,
  content,
  actions,
  actionsLayout,
  onClose
}) => (
  <PermissionDialog
    open={open}
    icon={Cloud}
    title={typeof title === 'string' ? title : 'PermissionDialog'}
    content={content}
    actions={actions}
    actionsLayout={actionsLayout}
    onClose={onClose}
  />
)

const dialogs = {
  StandardDialog,
  ConfirmDialog,
  FixedDialog,
  FixedActionsDialog,
  IllustrationDialog,
  PermissionDialog: PermissionDialogExample
} satisfies Record<string, React.ComponentType<StandardDialogProps>>

type DialogName = keyof typeof dialogs

const DialogActionsExample: React.FC<{ onClose: () => void }> = ({
  onClose
}) => (
  <>
    <Button variant="outlined" onClick={onClose}>
      Close Modal
    </Button>
    <Button>Do something</Button>
  </>
)

const TitleWithButton: React.FC = () => (
  <>
    This is the title
    <IconButton aria-label="More">
      <Icon icon={Dots} />
    </IconButton>
  </>
)

const titleWithButtonProps = {
  dialogTitle: {
    className:
      'u-flex u-flex-items-center u-flex-justify-between u-pv-0-s u-pv-1 u-pr-0-s'
  }
} satisfies StandardDialogProps['componentsProps']

const InnerElements: React.FC = () => {
  const { showAlert } = useAlert()
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [isInnerDialogOpen, setInnerDialogOpen] = useState(false)
  const [isInnerConfirmOpen, setInnerConfirmOpen] = useState(false)
  const [isSheetConfirmOpen, setSheetConfirmOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const closeMenu = (): void => setMenuAnchor(null)

  return (
    <>
      <Stack spacing={1} sx={{ mt: 2, alignItems: 'flex-start' }}>
        <Button
          onClick={() =>
            showAlert({ message: 'Hello', severity: 'success', duration: 5000 })
          }
        >
          Show an alert
        </Button>
        <Button onClick={() => setBottomSheetOpen(true)}>
          Show inner bottom sheet
        </Button>
        <Button onClick={() => setInnerConfirmOpen(true)}>
          Show inner confirm dialog
        </Button>
        <Button onClick={() => setInnerDialogOpen(true)}>
          Show inner dialog
        </Button>
        <Button onClick={event => setMenuAnchor(event.currentTarget)}>
          Show menu
        </Button>
      </Stack>
      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={closeMenu}
      >
        {[
          { icon: Pen, label: 'Modify' },
          { icon: People, label: 'People' },
          { icon: Attachment, label: 'Attachment' }
        ].map(({ icon, label }) => (
          <MenuItem key={label} onClick={closeMenu}>
            <ListItemIcon>
              <Icon icon={icon} />
            </ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
      {isInnerDialogOpen && (
        <StandardDialog
          open
          onClose={() => setInnerDialogOpen(false)}
          title="This is a simple title"
          content="This is a simple content"
        />
      )}
      {isInnerConfirmOpen && (
        <ConfirmDialog
          open
          onClose={() => setInnerConfirmOpen(false)}
          title="This is a simple title"
          content="This is a simple content"
        />
      )}
      {isBottomSheetOpen && (
        <BottomSheet backdrop onClose={() => setBottomSheetOpen(false)}>
          <BottomSheetItem>
            <Button onClick={() => setSheetConfirmOpen(true)} sx={{ mb: 2 }}>
              Show inner confirm dialog
            </Button>
            {LONG_TEXT}
            {isSheetConfirmOpen && (
              <ConfirmDialog
                open
                onClose={() => setSheetConfirmOpen(false)}
                title="This is a simple title"
                content="This is a simple content"
              />
            )}
          </BottomSheetItem>
        </BottomSheet>
      )}
    </>
  )
}

interface StoryArgs extends Pick<
  StandardDialogProps,
  | 'size'
  | 'actionsLayout'
  | 'align'
  | 'disableTitleAutoPadding'
  | 'disableGutters'
  | 'fullScreen'
> {
  dialog: DialogName
  contentLength: 'short' | 'long'
  longTitle: boolean
  hideTitle: boolean
  showActions: boolean
  withCloseButton: boolean
  withBackButton: boolean
  withBackground: boolean
  titleWithButton: boolean
}

const Playground: React.FC<StoryArgs> = ({
  dialog,
  contentLength,
  longTitle,
  hideTitle,
  showActions,
  withCloseButton,
  withBackButton,
  withBackground,
  titleWithButton,
  fullScreen,
  ...props
}) => {
  const { showAlert } = useAlert()
  const [open, setOpen] = useState(false)
  const DialogComponent = dialogs[dialog]

  const close = (): void => setOpen(false)
  const goBack = (): void => {
    showAlert({ message: 'Back button has been pressed', severity: 'success' })
    close()
  }
  const title =
    dialog === 'IllustrationDialog' ? (
      <Icon icon={Cloud} size={140} />
    ) : titleWithButton ? (
      <TitleWithButton />
    ) : longTitle ? (
      `${dialog} - ${SHORT_TEXT}`
    ) : (
      dialog
    )

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {dialog}</Button>
      {open && (
        <DialogComponent
          {...props}
          size={
            dialog === 'ConfirmDialog' || dialog === 'PermissionDialog'
              ? undefined
              : props.size
          }
          open
          fullScreen={fullScreen || undefined}
          onClose={withCloseButton ? close : undefined}
          onBack={withBackButton ? goBack : undefined}
          title={hideTitle ? undefined : title}
          componentsProps={titleWithButton ? titleWithButtonProps : undefined}
          background={withBackground ? BACKGROUND : undefined}
          content={
            <>
              <Typography component="div" variant="body1">
                {contentLength === 'long' ? LONG_TEXT : SHORT_TEXT}
              </Typography>
              <InnerElements />
            </>
          }
          actions={showActions && <DialogActionsExample onClose={close} />}
        />
      )}
    </>
  )
}

const meta: Meta<StoryArgs> = {
  title: 'Dialogs',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story): React.ReactElement => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    )
  ],
  argTypes: {
    dialog: { control: 'select', options: Object.keys(dialogs) },
    size: { control: 'select', options: sizes },
    actionsLayout: { control: 'inline-radio', options: ['row', 'column'] },
    align: { control: 'inline-radio', options: ['middle', 'top'] },
    contentLength: { control: 'inline-radio', options: ['short', 'long'] },
    disableTitleAutoPadding: { control: 'boolean' },
    disableGutters: { control: 'boolean' },
    fullScreen: { control: 'boolean' },
    longTitle: { control: 'boolean' },
    hideTitle: { control: 'boolean' },
    showActions: { control: 'boolean' },
    withCloseButton: { control: 'boolean' },
    withBackButton: { control: 'boolean' },
    withBackground: { control: 'boolean' },
    titleWithButton: { control: 'boolean' }
  },
  args: {
    dialog: 'StandardDialog',
    size: 'medium',
    actionsLayout: 'row',
    align: 'middle',
    contentLength: 'short',
    disableTitleAutoPadding: false,
    disableGutters: false,
    fullScreen: false,
    longTitle: false,
    hideTitle: false,
    showActions: true,
    withCloseButton: true,
    withBackButton: false,
    withBackground: false,
    titleWithButton: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <Playground {...args} />
}

const screenshotProps = {
  open: true,
  onClose: noop,
  content: SHORT_TEXT,
  actions: <DialogActionsExample onClose={noop} />
} satisfies StandardDialogProps

// Visual Regression - one story per dialog, since each one covers the screen
export const StandardDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => <StandardDialog {...screenshotProps} title="StandardDialog" />
}

export const ConfirmDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ConfirmDialog
      {...screenshotProps}
      title="Are you sure?"
      content="Content of a confirm dialog, precising what the actions will do, and asking the user if she is sure."
      actions={
        <>
          <Button variant="outlined">Close Modal</Button>
          <Button color="error">Do something destructive</Button>
        </>
      }
    />
  )
}

export const FixedDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <FixedDialog {...screenshotProps} title="FixedDialog" content={LONG_TEXT} />
  )
}

export const FixedActionsDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <FixedActionsDialog
      {...screenshotProps}
      title="FixedActionsDialog"
      content={LONG_TEXT}
    />
  )
}

export const IllustrationDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <IllustrationDialog
      {...screenshotProps}
      size="small"
      title={<Icon icon={Cloud} size={140} />}
    />
  )
}

export const PermissionDialogScreenshot: Story = {
  tags: ['argos'],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PermissionDialogExample
      {...screenshotProps}
      title="Are you sure?"
      content="Content of a confirm dialog, precising what the actions will do, and asking the user if she is sure."
    />
  )
}
