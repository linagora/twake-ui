import {
  File,
  FileTypeSheet,
  FileTypeSlide,
  FileTypeText,
  FileTypeVideo,
  Icon,
  Right
} from '@linagora/twake-icons'
import {
  Button,
  Checkbox,
  Divider,
  List,
  ListItemIcon,
  Radio
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import BottomSheetHeader from './BottomSheetHeader'
import BottomSheetItem from './BottomSheetItem'
import BottomSheetTitle from './BottomSheetTitle'
import BottomSheet from './index'
import ListItemButton from '../ListItemButton'
import ListItemText from '../ListItemText'

interface ExampleArgs {
  open: boolean
  backdrop: boolean
  closable: boolean
  skipAnimation: boolean
  disablePortal: boolean
  withFakeToolbar: boolean
  withHeader: boolean
  withTitle: boolean
  withListContent: boolean
  longContent: boolean
  isOpenMin: boolean
  hasMinHeightOffset: boolean
  mediumHeight?: number
  mediumHeightRatio?: number
  offset?: number
}

const shortContent =
  'Ada Lovelace wrote the first algorithm intended to be carried out by a machine, the Analytical Engine imagined by Charles Babbage.'

const longContent = Array.from(
  { length: 12 },
  (_, index) =>
    `${index + 1}. ${shortContent} She saw that such a machine could handle symbols as well as numbers, and could one day compose music.`
).join(' ')

const ListContent: React.FC<{ withTitle: boolean }> = ({ withTitle }) => (
  <BottomSheetItem disableGutters>
    {withTitle && (
      <>
        <BottomSheetTitle icon={FileTypeText} label="Title" />
        <Divider />
      </>
    )}
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={File} />
        </ListItemIcon>
        <ListItemText
          primary="Item with icon"
          secondary="and with secondary text"
        />
      </ListItemButton>
      <Divider variant="inset" />
      <ListItemButton>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary="Item with checkbox" />
      </ListItemButton>
      <Divider variant="inset" />
      <ListItemButton>
        <ListItemIcon>
          <Radio />
        </ListItemIcon>
        <ListItemText primary="Item with radio" />
      </ListItemButton>
      <Divider variant="inset" />
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={File} />
        </ListItemIcon>
        <ListItemText primary="Item with secondary action" />
        <Icon icon={Right} />
      </ListItemButton>
    </List>
    <Divider />
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeText} size={32} />
        </ListItemIcon>
        <ListItemText primary="Files" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeSheet} size={32} />
        </ListItemIcon>
        <ListItemText primary="Sheets" />
      </ListItemButton>
    </List>
    <Divider variant="inset" />
    <List>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeSlide} size={32} />
        </ListItemIcon>
        <ListItemText primary="Slides" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon icon={FileTypeVideo} size={32} />
        </ListItemIcon>
        <ListItemText primary="Videos" />
      </ListItemButton>
    </List>
  </BottomSheetItem>
)

const ExampleBottomSheet: React.FC<ExampleArgs> = args => {
  const [isOpen, setIsOpen] = useState(args.open)
  const [isSecondOpen, setIsSecondOpen] = useState(false)

  const handleClose = (): void => setIsOpen(false)

  const settings =
    args.mediumHeight === undefined && args.mediumHeightRatio === undefined
      ? {}
      : {
          mediumHeight: args.mediumHeight,
          mediumHeightRatio: args.mediumHeightRatio
        }

  return (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(true)}>
        Open BottomSheet
      </Button>

      {isOpen && (
        <BottomSheet
          toolbarProps={args.withFakeToolbar ? { height: 50 } : undefined}
          settings={{
            ...settings,
            isOpenMin: args.isOpenMin,
            hasMinHeightOffset: args.hasMinHeightOffset
          }}
          backdrop={args.backdrop}
          skipAnimation={args.skipAnimation}
          offset={args.offset}
          onClose={args.closable ? handleClose : undefined}
          portalProps={{ disablePortal: args.disablePortal }}
        >
          {args.withHeader && (
            <BottomSheetHeader sx={{ px: 2, pb: 2, gap: 1 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsSecondOpen(true)}
              >
                Open BottomSheet
              </Button>
              <Button variant="outlined" fullWidth>
                Button 2
              </Button>

              {isSecondOpen && (
                <BottomSheet backdrop onClose={() => setIsSecondOpen(false)}>
                  <BottomSheetItem>{shortContent}</BottomSheetItem>
                </BottomSheet>
              )}
            </BottomSheetHeader>
          )}
          {args.withListContent ? (
            <ListContent withTitle={args.withTitle} />
          ) : (
            <>
              {args.withTitle && <BottomSheetTitle label="Title" />}
              <BottomSheetItem>
                {args.longContent ? longContent : shortContent}
              </BottomSheetItem>
            </>
          )}
        </BottomSheet>
      )}
    </>
  )
}

const meta: Meta<ExampleArgs> = {
  title: 'BottomSheet',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A `backdrop` requires the sheet to be closable: check `closable` whenever `backdrop` is checked.'
      }
    }
  },
  argTypes: {
    open: { control: 'boolean' },
    backdrop: { control: 'boolean' },
    closable: { control: 'boolean' },
    skipAnimation: { control: 'boolean' },
    disablePortal: { control: 'boolean' },
    withFakeToolbar: { control: 'boolean' },
    withHeader: { control: 'boolean' },
    withTitle: { control: 'boolean' },
    withListContent: { control: 'boolean' },
    longContent: { control: 'boolean' },
    isOpenMin: { control: 'boolean' },
    hasMinHeightOffset: { control: 'boolean' },
    mediumHeight: { control: 'number' },
    mediumHeightRatio: { control: { type: 'number', step: 0.05 } },
    offset: { control: 'number' }
  },
  args: {
    open: false,
    backdrop: true,
    closable: true,
    skipAnimation: false,
    disablePortal: false,
    withFakeToolbar: false,
    withHeader: true,
    withTitle: false,
    withListContent: false,
    longContent: false,
    isOpenMin: false,
    hasMinHeightOffset: false
  },
  render: args => <ExampleBottomSheet {...args} />
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

// Visual Regression - the sheet open at its medium stop, with every subcomponent. Kept out of
// the docs page, where its open sheet would cover the whole page
export const Screenshot: Story = {
  tags: ['argos', '!autodocs'],
  render: () => (
    <BottomSheet
      backdrop
      skipAnimation
      settings={{ mediumHeight: 450 }}
      onClose={() => undefined}
    >
      <BottomSheetHeader sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button variant="outlined" fullWidth>
          Button 1
        </Button>
        <Button variant="outlined" fullWidth>
          Button 2
        </Button>
      </BottomSheetHeader>
      <BottomSheetTitle label="Title" />
      <BottomSheetItem>{shortContent}</BottomSheetItem>
      <ListContent withTitle />
    </BottomSheet>
  )
}
