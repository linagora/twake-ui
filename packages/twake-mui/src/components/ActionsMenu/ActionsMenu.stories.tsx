import {
  Attachment,
  Attention,
  Contrast,
  Copy,
  File,
  FileTypeText,
  Icon,
  Pen,
  People,
  Telephone
} from '@linagora/twake-icons'
import {
  Box,
  Divider,
  ListItemIcon,
  PopoverOrigin,
  Typography
} from '@mui/material'
import { Globals } from '@react-spring/web'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { forwardRef, useRef, useState } from 'react'

import DropdownButton from '../DropdownButton'
import ListItemText from '../ListItemText'
import { call } from './Actions/call'
import { divider } from './Actions/divider'
import { emailTo } from './Actions/emailTo'
import { makeActions } from './Actions/helpers'
import { modify } from './Actions/modify'
import { print } from './Actions/print'
import { PrintClient } from './Actions/print'
import { smsTo } from './Actions/smsTo'
import { viewInContacts } from './Actions/viewInContacts'
import { viewInDrive } from './Actions/viewInDrive'
import ActionsMenuItem from './ActionsMenuItem'
import ActionsMenuMobileHeader from './ActionsMenuMobileHeader'
import ActionsMenuWrapper from './ActionsMenuWrapper'
import ActionsMenu from './index'
import {
  Action,
  ActionComponentProps,
  ActionDocument,
  WebLinkClient
} from './types'

const doc: ActionDocument = {
  _id: 'id01',
  _type: 'io.cozy.contacts',
  phone: [{ number: '0102030405' }],
  email: [{ address: 'johndoe@example.com' }]
}

const mockClient: WebLinkClient & PrintClient = {
  getStackClient: () => ({ uri: 'https://' }),
  getInstanceOptions: () => ({ subdomain: '' }),
  collection: () => ({ getDownloadLinkById: () => Promise.resolve('') })
}

const LONG_TEXT =
  'This is a custom action, with a very long text to show how it is displayed'

const CustomActionComponent = forwardRef<HTMLElement, ActionComponentProps>(
  (props, ref) => (
    <ActionsMenuItem {...props} ref={ref}>
      <ListItemIcon>
        <Icon icon={File} />
      </ListItemIcon>
      <ListItemText primary={LONG_TEXT} secondary={LONG_TEXT} />
    </ActionsMenuItem>
  )
)

CustomActionComponent.displayName = 'customAction'

const customAction = (): Action => ({
  name: 'customAction',
  action: () => undefined,
  Component: CustomActionComponent
})

const actions = makeActions(
  [
    modify,
    viewInContacts,
    viewInDrive,
    divider,
    call,
    smsTo,
    emailTo,
    print,
    divider,
    customAction
  ],
  {
    client: mockClient,
    generateWebLink: () => '',
    fetchBlobFileById: () => Promise.resolve(new Blob()),
    isFile: () => false
  }
)

const MobileHeader = (): React.JSX.Element => (
  <ActionsMenuMobileHeader>
    <ListItemIcon>
      <Icon icon={FileTypeText} size={32} />
    </ListItemIcon>
    <ListItemText primary="Title" slotProps={{ primary: { variant: 'h6' } }} />
  </ActionsMenuMobileHeader>
)

interface ExampleArgs {
  defaultOpen: boolean
  vertical: PopoverOrigin['vertical']
  horizontal: PopoverOrigin['horizontal']
  autoClose: boolean
  autoCloseOnContextMenu: boolean
}

const ExampleActionsMenu = ({
  defaultOpen,
  vertical,
  horizontal,
  autoClose,
  autoCloseOnContextMenu
}: ExampleArgs): React.JSX.Element => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <>
      <DropdownButton
        ref={anchorRef}
        aria-haspopup="true"
        onClick={() => setIsOpen(open => !open)}
      >
        Show action menu
      </DropdownButton>
      <ActionsMenu
        ref={anchorRef}
        open={isOpen}
        docs={[doc]}
        actions={actions}
        anchorOrigin={{ vertical, horizontal }}
        autoClose={autoClose}
        autoCloseOnContextMenu={autoCloseOnContextMenu}
        autoFocus={!defaultOpen}
        disablePortal={defaultOpen}
        disableScrollLock={defaultOpen}
        onClose={() => setIsOpen(false)}
      >
        <MobileHeader />
      </ActionsMenu>
    </>
  )
}

const ExampleManualActionsMenu = ({
  defaultOpen
}: Pick<ExampleArgs, 'defaultOpen'>): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <>
      <DropdownButton
        ref={setAnchorEl}
        aria-haspopup="true"
        onClick={() => setIsOpen(open => !open)}
      >
        Show action menu
      </DropdownButton>
      {isOpen && anchorEl !== null && (
        <ActionsMenuWrapper
          open
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          autoClose
          autoFocus={!defaultOpen}
          disablePortal={defaultOpen}
          disableScrollLock={defaultOpen}
          onClose={() => setIsOpen(false)}
        >
          <MobileHeader />
          <ActionsMenuItem autoFocus>
            <ListItemIcon>
              <Icon icon={Pen} />
            </ListItemIcon>
            <ListItemText primary="Modify" />
            <ListItemIcon>
              <Typography color="error">
                <Icon icon={Attention} />
              </Typography>
            </ListItemIcon>
          </ActionsMenuItem>
          <ActionsMenuItem>
            <ListItemIcon>
              <Icon icon={People} />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ActionsMenuItem>
          <ActionsMenuItem>
            <ListItemIcon>
              <Icon icon={Attachment} />
            </ListItemIcon>
            <ListItemText primary="Attachment" />
          </ActionsMenuItem>
          <ActionsMenuItem>
            <ListItemText primary="Item without icon" />
          </ActionsMenuItem>
          <Divider sx={{ my: 1 }} />
          <ActionsMenuItem>
            <ListItemIcon>
              <Icon icon={Telephone} />
            </ListItemIcon>
            <ListItemText primary="Call" />
          </ActionsMenuItem>
          <ActionsMenuItem>
            <ListItemIcon>
              <Icon icon={Contrast} />
            </ListItemIcon>
            <ListItemText primary="Contrast" />
          </ActionsMenuItem>
          <ActionsMenuItem>
            <ListItemIcon>
              <Icon icon={Copy} />
            </ListItemIcon>
            <ListItemText primary="Copy" />
          </ActionsMenuItem>
        </ActionsMenuWrapper>
      )}
    </>
  )
}

/** The bottom sheet animates through react-spring, which Playwright cannot fast-forward */
const skipSpringAnimations = (): (() => void) => {
  Globals.assign({ skipAnimation: true })

  return () => Globals.assign({ skipAnimation: false })
}

const meta: Meta<ExampleArgs> = {
  title: 'ActionsMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Menu of actions built with `makeActions`, displayed as a bottom sheet on mobile. `ActionsMenuMobileHeader` only renders on mobile, where the menu hides its anchor.'
      }
    }
  },
  argTypes: {
    defaultOpen: { control: 'boolean' },
    vertical: { control: 'select', options: ['top', 'center', 'bottom'] },
    horizontal: { control: 'select', options: ['left', 'center', 'right'] },
    autoClose: { control: 'boolean' },
    autoCloseOnContextMenu: { control: 'boolean' }
  },
  args: {
    defaultOpen: false,
    vertical: 'bottom',
    horizontal: 'left',
    autoClose: true,
    autoCloseOnContextMenu: true
  },
  render: args => <ExampleActionsMenu {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ManualActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Items written by hand inside `ActionsMenuWrapper`, without `makeActions`.'
      }
    }
  },
  render: args => <ExampleManualActionsMenu defaultOpen={args.defaultOpen} />
}

// Visual Regression - the menu built with makeActions, opened. Kept out of the
// docs page, where its open bottom sheet would cover the whole page on mobile
export const Screenshot: Story = {
  tags: ['argos', '!autodocs'],
  parameters: { layout: 'padded' },
  beforeEach: skipSpringAnimations,
  render: args => (
    <Box sx={{ minHeight: 640 }}>
      <ExampleActionsMenu {...args} defaultOpen />
    </Box>
  )
}

// Visual Regression - the menu written by hand, opened
export const ManualScreenshot: Story = {
  tags: ['argos', '!autodocs'],
  parameters: { layout: 'padded' },
  beforeEach: skipSpringAnimations,
  render: () => (
    <Box sx={{ minHeight: 440 }}>
      <ExampleManualActionsMenu defaultOpen />
    </Box>
  )
}
