import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { File, Icon } from '@linagora/twake-icons'

import Filename, { FilenameProps } from './index'

const longName =
  'Lacinia condimentum potenti id est tortor dictumst lectus tincidunt hac ultricies, curae mattis nisi neque sodales sagittis dui nulla aliquam turpis eros, finibus ac iaculis dictum et orci elit posuere ex and this is the end'
const shortName = 'Lacinia condimentum this is the end'
const path = '/some/folder/and/subfolder'
const icon = <Icon icon={File} size={32} />

const examples: { title: string; props: FilenameProps }[] = [
  {
    title: 'Icon, extension and path',
    props: { icon, filename: longName, extension: '.pdf', path }
  },
  {
    title: 'Middle ellipsis',
    props: {
      icon,
      filename: longName,
      extension: '.pdf',
      path,
      midEllipsis: true
    }
  },
  {
    title: 'Without path',
    props: { icon, filename: longName, extension: '.pdf' }
  },
  {
    title: 'Without path, middle ellipsis',
    props: { icon, filename: longName, extension: '.pdf', midEllipsis: true }
  },
  {
    title: 'Body1 variant',
    props: {
      icon,
      filename: longName,
      extension: '.pdf',
      path,
      variant: 'body1'
    }
  },
  {
    title: 'Without icon',
    props: { filename: longName, extension: '.pdf', path }
  },
  {
    title: 'Without extension',
    props: { icon, filename: longName, path }
  },
  {
    title: 'Short name',
    props: { icon, filename: shortName, extension: '.pdf', path }
  },
  {
    title: 'Short name without path',
    props: { icon, filename: shortName, extension: '.pdf' }
  }
]

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3>{title}</h3>
    {children}
  </section>
)

const meta: Meta<typeof Filename> = {
  title: 'Filename',
  component: Filename,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
    filename: { control: 'text' },
    extension: { control: 'text' },
    midEllipsis: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['h6', 'body1', 'body2', 'subtitle1', 'caption']
    },
    path: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon,
    filename: longName,
    extension: '.pdf',
    midEllipsis: false,
    variant: 'h6',
    path
  },
  render: args => (
    <Box sx={{ maxWidth: 400 }}>
      <Filename {...args} />
    </Box>
  )
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4} sx={{ maxWidth: 400 }}>
      {examples.map(({ title, props }) => (
        <Section key={title} title={title}>
          <Filename {...props} />
        </Section>
      ))}
    </Stack>
  )
}
