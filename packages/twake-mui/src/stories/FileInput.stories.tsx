import { ListItemIcon, MenuList, Paper, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MuiFileInput } from 'mui-file-input'
import React, { useState } from 'react'

import { CrossSmall, Icon, Upload } from '@linagora/twake-icons'

import ActionsMenuItem from '../components/ActionsMenu/ActionsMenuItem'
import Button from '../components/Button'
import ListItemText from '../components/ListItemText'
import AlertProvider from '../providers/AlertProvider'
import { useAlert } from '../providers/AlertProvider/useAlert'

const description = `
To open the file picker from a button or a menu item, render the trigger as a \`label\`, with \`component="label"\`, and put a hidden \`input type="file"\` inside it. The label opens the picker on click, Enter and Space.

\`\`\`jsx
const handleChange = event => {
  const files = Array.from(event.target.files)
  event.target.value = ''
  onUpload(files)
}

<Button component="label" variant="primary" startIcon={<Icon icon={Upload} />}>
  Upload
  <input hidden type="file" multiple data-testid="upload-btn" onChange={handleChange} />
</Button>
\`\`\`

- Resetting \`event.target.value\` lets the user pick the same file again.
- \`disabled\` on the trigger also blocks the picker.
- To keep the picker closed, call \`event.preventDefault()\` in the \`input\`'s \`onClick\`.
- In tests, fire the change on the input: \`fireEvent.change(getByTestId('upload-btn'), { target: { files: [file] } })\`.

#### File field with the chosen files

For a form field that displays the chosen files, with size limits or a clear button, install [\`mui-file-input\`](https://viclafouch.github.io/mui-file-input/) in the app and use \`MuiFileInput\`, as in the **Field** story below. It is a \`TextField\`, so twake-mui themes it.
`

const getFileNames = (files: File[]): string =>
  files.length > 0 ? files.map(file => file.name).join(', ') : 'No file chosen'

const readFiles = (event: React.ChangeEvent<HTMLInputElement>): File[] => {
  const files = Array.from(event.target.files ?? [])
  event.target.value = ''
  return files
}

interface UploadButtonProps {
  disabled: boolean
}

const UploadButton = ({ disabled }: UploadButtonProps): React.JSX.Element => {
  const [files, setFiles] = useState<File[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFiles(readFiles(event))
  }

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Button
        component="label"
        variant="primary"
        disabled={disabled}
        startIcon={<Icon icon={Upload} />}
      >
        Upload
        <input
          hidden
          type="file"
          multiple
          data-testid="upload-btn"
          onChange={handleChange}
        />
      </Button>
      <Typography variant="caption">{getFileNames(files)}</Typography>
    </Stack>
  )
}

interface UploadMenuItemProps {
  isReadOnly: boolean
}

const UploadMenuItem = ({
  isReadOnly
}: UploadMenuItemProps): React.JSX.Element => {
  const { showAlert } = useAlert()
  const [files, setFiles] = useState<File[]>([])

  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    if (!isReadOnly) return

    event.preventDefault()
    showAlert({
      message: 'This is a read-only folder. You cannot perform this action.',
      severity: 'warning',
      duration: 4000
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFiles(readFiles(event))
  }

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Paper>
        <MenuList>
          <ActionsMenuItem component="label">
            <ListItemIcon>
              <Icon icon={Upload} />
            </ListItemIcon>
            <ListItemText primary="Upload files" />
            <input
              hidden
              type="file"
              multiple
              data-testid="upload-btn"
              onClick={handleClick}
              onChange={handleChange}
            />
          </ActionsMenuItem>
        </MenuList>
      </Paper>
      <Typography variant="caption">{getFileNames(files)}</Typography>
    </Stack>
  )
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

const AttachmentsField = (): React.JSX.Element => {
  const [files, setFiles] = useState<File[]>([])
  const hasTooLargeFile = files.some(file => file.size > MAX_FILE_SIZE)

  return (
    <MuiFileInput
      multiple
      label="Attachments"
      value={files}
      onChange={setFiles}
      error={hasTooLargeFile}
      helperText={
        hasTooLargeFile
          ? 'Each file must be under 5 MB'
          : 'PDF or images, 5 MB max per file'
      }
      slotProps={{ htmlInput: { accept: 'image/*,.pdf' } }}
      clearIconButtonProps={{
        title: 'Remove',
        children: <Icon icon={CrossSmall} />
      }}
      sx={{ width: 360 }}
    />
  )
}

interface FileInputArgs {
  disabled: boolean
  isReadOnly: boolean
}

const meta: Meta<FileInputArgs> = {
  title: 'FileInput',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: description } }
  },
  args: { disabled: false, isReadOnly: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  argTypes: { isReadOnly: { table: { disable: true } } },
  parameters: {
    docs: {
      description: {
        story:
          'An upload button. With `disabled`, the file picker does not open.'
      }
    }
  },
  render: args => <UploadButton disabled={args.disabled} />
}

export const InMenu: Story = {
  argTypes: { disabled: { table: { disable: true } } },
  parameters: {
    docs: {
      description: {
        story:
          'An upload item in a menu. With `isReadOnly`, the click shows an alert and the file picker does not open.'
      }
    }
  },
  render: args => (
    <AlertProvider>
      <UploadMenuItem isReadOnly={args.isReadOnly} />
    </AlertProvider>
  )
}

export const Field: Story = {
  argTypes: {
    disabled: { table: { disable: true } },
    isReadOnly: { table: { disable: true } }
  },
  parameters: {
    docs: {
      description: {
        story:
          'An attachments field with `mui-file-input`: PDF or images only, a clear button, and an error message when a file is over 5 MB.'
      }
    }
  },
  render: () => <AttachmentsField />
}
