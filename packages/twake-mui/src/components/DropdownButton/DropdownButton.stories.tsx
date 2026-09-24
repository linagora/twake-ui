import { Box, Grid, Stack, Typography } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { DropdownTextVariant } from '../DropdownText'
import DropdownButton from './index'

const variants: DropdownTextVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption'
]

const meta: Meta<typeof DropdownButton> = {
  title: 'DropdownButton',
  component: DropdownButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    textVariant: { control: 'select', options: variants },
    spaceBetween: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    noWrap: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Dropdown button'
  }
}

const Container: React.FC<{
  width?: number | string
  children: React.ReactNode
}> = ({ width, children }) => (
  <Box sx={{ border: '1px dashed', borderColor: 'divider', width }}>
    {children}
  </Box>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Grid container>
        <Grid size={6}>
          <Typography>Default</Typography>
          {variants.map(variant => (
            <Box key={variant} sx={{ mb: 2 }}>
              <DropdownButton textVariant={variant}>{variant}</DropdownButton>
            </Box>
          ))}
        </Grid>
        <Grid size={6}>
          <Typography>Disabled</Typography>
          {variants.map(variant => (
            <Box key={variant} sx={{ mb: 2 }}>
              <DropdownButton textVariant={variant} disabled>
                {variant}
              </DropdownButton>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Container>
        <DropdownButton>
          This is a long text without ellipsis without restrictive container
        </DropdownButton>
      </Container>

      <Container width={150}>
        <DropdownButton>
          This is a long text without ellipsis inside a restrictive container
        </DropdownButton>
      </Container>

      <Container width={150}>
        <DropdownButton noWrap>
          This is a long text with ellipsis inside a container
        </DropdownButton>
      </Container>

      <Container width="100%">
        <DropdownButton>
          Text with
          <br />
          breaking spaces
          <br />
          inside content
        </DropdownButton>
      </Container>

      <Container width="100%">
        <DropdownButton fullWidth spaceBetween>
          Space between text and icon (fullWidth needed)
        </DropdownButton>
      </Container>

      <Container width="100%">
        <DropdownButton fullWidth>
          Full width but no space between text and icon
        </DropdownButton>
      </Container>
    </Stack>
  )
}
