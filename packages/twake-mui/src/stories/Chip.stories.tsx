import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Avatar, Box } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Chip } from '../components/Chip'

const meta: Meta<typeof Chip> = {
  title: 'Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'error', 'warning', 'success']
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined']
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: 'default',
    variant: 'filled',
    label: 'Chip Content'
  },
  render: args => <Chip {...args} />
}

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => {
    const colors = [
      'default',
      'primary',
      'error',
      'warning',
      'success'
    ] as const
    const variants = ['filled', 'outlined'] as const

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {colors.map(color => (
          <div key={color}>
            <h2 style={{ textTransform: 'capitalize', marginBottom: '16px' }}>
              {color}
            </h2>
            <div style={{ display: 'flex', gap: '32px' }}>
              {variants.map(variant => (
                <div
                  key={variant}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <h4 style={{ textTransform: 'capitalize', margin: 0 }}>
                    {variant}
                  </h4>

                  {/* Default State */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      default
                    </div>
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      onDelete={() => {}}
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      icon={<InsertDriveFileIcon />}
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      icon={<InsertDriveFileIcon />}
                      onDelete={() => {}}
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      avatar={<Avatar>M</Avatar>}
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Picture.jpg"
                      avatar={<Avatar>M</Avatar>}
                      endAdornment={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <CloudUploadIcon />
                          <FileDownloadIcon />
                        </Box>
                      }
                    />
                  </div>

                  {/* Disabled State */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      disabled
                    </div>
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      disabled
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      onDelete={() => {}}
                      disabled
                    />
                    <Chip
                      color={color}
                      variant={variant}
                      label="Chip Content"
                      icon={<InsertDriveFileIcon />}
                      disabled
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export const Actions: Story = {
  args: {
    color: 'default',
    variant: 'filled',
    label: 'Picture.jpg',
    avatar: <Avatar src="https://i.pravatar.cc/150?img=1" />,
    endAdornment: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CloudUploadIcon
          onClick={e => {
            e.stopPropagation()
            alert('cloud')
          }}
        />
        <FileDownloadIcon
          onClick={e => {
            e.stopPropagation()
            alert('download')
          }}
        />
      </Box>
    )
  },
  render: args => <Chip {...args} />
}
