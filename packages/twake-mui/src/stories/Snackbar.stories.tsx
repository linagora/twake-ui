import { Cross, Icon } from '@linagora/twake-icons'
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  SnackbarProps,
  Stack
} from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

const severities = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const meta: Meta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    autoHideDuration: { control: 'number' },
    anchorOrigin: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const actions = (onClose: () => void): React.ReactNode => (
  <>
    <Button variant="text" color="error" size="small" onClick={onClose}>
      UNDO
    </Button>
    <IconButton aria-label="close" color="inherit" onClick={onClose}>
      <Icon icon={Cross} size={14} />
    </IconButton>
  </>
)

const OpenableSnackbar: React.FC<SnackbarProps> = props => {
  const [open, setOpen] = React.useState(false)
  const toggle = (): void => setOpen(value => !value)

  return (
    <>
      <Button variant="ghost" size="small" onClick={toggle}>
        Open snackbar
      </Button>
      <Snackbar
        open={open}
        message="This is a simple snackbar."
        action={actions(toggle)}
        onClose={toggle}
        {...props}
      />
    </>
  )
}

export const Default: Story = {
  render: args => <OpenableSnackbar {...args} />
}

// Renders in the flow of the page rather than fixed at the bottom. The top-left
// anchor is the only one MUI positions without a transform, so nothing has to
// win over the anchor rules.
const staticProps = {
  open: true,
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  sx: { position: 'static' }
} satisfies Partial<SnackbarProps>

// Visual Regression - Every example of the cozy-ui Snackbar doc
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Message and actions</h3>
        <Snackbar
          {...staticProps}
          message="This is a simple snackbar."
          action={actions(() => undefined)}
        />
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>With an Alert inside</h3>
        <Stack spacing={2}>
          {severities.map(severity => (
            <Snackbar key={severity} {...staticProps}>
              <Alert
                variant="filled"
                elevation={6}
                severity={severity}
                onClose={() => undefined}
              >
                This is a {severity} message!
              </Alert>
            </Snackbar>
          ))}
        </Stack>
      </section>
    </Stack>
  )
}
