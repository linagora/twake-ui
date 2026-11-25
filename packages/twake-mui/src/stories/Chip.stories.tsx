/* eslint-disable no-console */
import { Avatar, Grid, Stack, Typography, IconButton } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Icon, FileOutline, Openwith, Right } from '@linagora/twake-icons'

import { Chip } from '../components/Chip/index.js'

const meta: Meta<typeof Chip> = {
  title: 'Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'warning',
        'success'
      ]
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost']
    },
    disabled: {
      control: 'boolean'
    },
    size: {
      control: 'select',
      options: ['small', 'medium']
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

const LONG_LABEL = 'a.very.long.address.that.goes.on.and.on.again@example.com'

const COLORS = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const
const VARIANTS = ['filled', 'outlined', 'ghost'] as const
const SQUARE_PROPS = [false, true] as const

const renderChipMatrix = (size: 'small' | 'medium'): React.ReactElement => (
  <Stack spacing={4}>
    {SQUARE_PROPS.map(square => (
      <div key={String(square)}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {square ? 'Square' : 'Rounded'}
        </Typography>
        {COLORS.map(color => (
          <div key={color}>
            <Typography
              variant="h4"
              sx={{ textTransform: 'capitalize', mt: 2 }}
            >
              {color}
            </Typography>
            <Grid container spacing={4}>
              {VARIANTS.map(variant => (
                <Grid key={variant} size={{ xs: 12, sm: 4 }}>
                  <Stack spacing={2}>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {variant}
                    </Typography>

                    {/* Default State */}
                    <Stack spacing={1}>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        default
                      </Typography>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Simple Chip"
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Clickable Chip"
                          clickable
                          onClick={() => console.info('click')}
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Deletable chip"
                          onDelete={() => console.info('delete')}
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Chip with Icon"
                          icon={<Icon icon={FileOutline} />}
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Deletable chip with icon"
                          icon={<Icon icon={FileOutline} />}
                          onDelete={() => console.info('delete')}
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Avatar Chip"
                          avatar={<Avatar>M</Avatar>}
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Action chip"
                          avatar={<Avatar>M</Avatar>}
                          deleteIcon={
                            <IconButton
                              size={size === 'small' ? 'xsmall' : 'small'}
                            >
                              <Icon icon={Right} />
                            </IconButton>
                          }
                          endIcon={
                            <IconButton
                              size={size === 'small' ? 'xsmall' : 'small'}
                              sx={{
                                color:
                                  color === 'default'
                                    ? `${color}.main`
                                    : `inherit`
                              }}
                              onClick={() =>
                                console.info('end adornment clicked')
                              }
                            >
                              <Icon icon={Openwith} />
                            </IconButton>
                          }
                          onDelete={() => console.info('delete')}
                          square={square}
                          size={size}
                        />
                      </div>
                    </Stack>

                    {/* Disabled State */}
                    <Stack spacing={1}>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        disabled
                      </Typography>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Chip Content"
                          disabled
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Chip Content"
                          onDelete={() => {}}
                          disabled
                          square={square}
                          size={size}
                        />
                      </div>
                      <div>
                        <Chip
                          color={color}
                          variant={variant}
                          label="Chip Content"
                          icon={<Icon icon={FileOutline} />}
                          disabled
                          square={square}
                          size={size}
                        />
                      </div>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </div>
    ))}
  </Stack>
)

export const ScreenshotSmall: Story = {
  tags: ['argos'],
  render: () => renderChipMatrix('small')
}

export const ScreenshotMedium: Story = {
  tags: ['argos'],
  render: () => renderChipMatrix('medium')
}

export const ScreenshotLongLabel: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={2} sx={{ width: 240, alignItems: 'flex-start' }}>
      <Chip label={LONG_LABEL} onDelete={() => {}} />
      <Chip label={LONG_LABEL} onDelete={() => {}} sx={{ maxWidth: 200 }} />
      <Chip label={LONG_LABEL} onDelete={() => {}} size="small" />
      <Chip
        label={LONG_LABEL}
        onDelete={() => {}}
        deleteIcon={<Icon icon={FileOutline} />}
      />
    </Stack>
  )
}
