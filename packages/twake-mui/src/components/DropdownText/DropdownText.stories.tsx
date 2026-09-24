import { Box, Grid, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import DropdownText, { DropdownTextVariant } from './index'

const variants: DropdownTextVariant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption'
]

const columns = [
  { title: 'Default', props: {} },
  { title: 'Disabled', props: { disabled: true } },
  { title: 'Color primary', props: { color: 'primary' } },
  { title: 'Color error', props: { color: 'error' } }
]

const meta: Meta<typeof DropdownText> = {
  title: 'DropdownText',
  component: DropdownText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'textSecondary']
    },
    disabled: { control: 'boolean' },
    noWrap: { control: 'boolean' },
    spaceBetween: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Dropdown'
  }
}

const Frame: React.FC<{ width?: string; children: React.ReactNode }> = ({
  width,
  children
}) => (
  <Box sx={{ width, border: 1, borderStyle: 'dashed', borderColor: 'divider' }}>
    {children}
  </Box>
)

// Visual Regression - Combined view for Argos testing
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <section>
        <h3 style={{ marginBottom: '12px' }}>Variants</h3>
        <Grid container spacing={2}>
          {columns.map(({ title, props }) => (
            <Grid key={title} size={{ xs: 6, sm: 3 }}>
              <Stack spacing={2}>
                <div>{title}</div>
                {variants.map(variant => (
                  <DropdownText key={variant} variant={variant} {...props}>
                    {variant}
                  </DropdownText>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </section>

      <section>
        <h3 style={{ marginBottom: '12px' }}>Containers</h3>
        <Stack spacing={2}>
          <Frame>
            <DropdownText>
              This is a long text without ellipsis without restrictive container
            </DropdownText>
          </Frame>
          <Frame width="150px">
            <DropdownText>
              This is a long text without ellipsis inside a restrictive
              container
            </DropdownText>
          </Frame>
          <Frame width="150px">
            <DropdownText noWrap>
              This is a long text with ellipsis inside a container
            </DropdownText>
          </Frame>
          <Frame>
            <DropdownText>
              Text with
              <br />
              breaking spaces
              <br />
              inside content
            </DropdownText>
          </Frame>
          <Frame>
            <DropdownText spaceBetween>
              Space between text and icon
            </DropdownText>
          </Frame>
        </Stack>
      </section>
    </Stack>
  )
}
