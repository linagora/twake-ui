/* eslint-disable no-console */
import { Avatar, Grid, Stack, Typography, IconButton } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect } from 'storybook/test'

import { Icon, FileOutline, Openwith, Right } from '@linagora/twake-icons'

import { Chip } from '../components/Chip'

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

export const Screenshot: Story = {
  tags: ['argos'],
  render: () => {
    const colors = [
      'default',
      'primary',
      'secondary',
      'success',
      'error',
      'warning',
      'info'
    ] as const
    const variants = ['filled', 'outlined', 'ghost'] as const
    const squareProps = [false, true] as const
    const sizeProps = ['small', 'medium'] as const

    return (
      <Stack spacing={4}>
        {sizeProps.map(size => (
          <div key={size}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              {size}
            </Typography>
            {squareProps.map(square => (
              <div key={String(square)}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {square ? 'Square' : 'Rounded'}
                </Typography>
                {colors.map(color => (
                  <div key={color}>
                    <Typography
                      variant="h4"
                      sx={{ textTransform: 'capitalize', mt: 2 }}
                    >
                      {color}
                    </Typography>
                    <Grid container spacing={4}>
                      {variants.map(variant => (
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
                                      size={
                                        size === 'small' ? 'xsmall' : 'small'
                                      }
                                    >
                                      <Icon icon={Right} />
                                    </IconButton>
                                  }
                                  endIcon={
                                    <IconButton
                                      size={
                                        size === 'small' ? 'xsmall' : 'small'
                                      }
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
          </div>
        ))}
      </Stack>
    )
  }
}

// The delete icon keeps the chip colour while hovered or pressed. Synthetic
// events do not trigger :hover, so the play reads the winning CSS rule.
export const GhostDeleteIconHover: Story = {
  tags: ['argos'],
  render: () => (
    <Chip
      variant="ghost"
      color="primary"
      label="last 7 days"
      onDelete={() => console.info('delete')}
      data-testid="ghost-chip"
    />
  ),
  play: async ({ canvas }) => {
    const chip = canvas.getByTestId('ghost-chip')
    const chipClass = [...chip.classList].find(name => name.startsWith('css-'))
    const rules = [...document.styleSheets].flatMap(sheet => {
      try {
        return [...sheet.cssRules] as CSSStyleRule[]
      } catch {
        // Cross-origin font sheets cannot be read
        return []
      }
    })
    for (const state of ['hover', 'active']) {
      const matching = rules.filter(rule =>
        rule.selectorText?.includes(
          `.${chipClass} .MuiChip-deleteIcon:${state}`
        )
      )
      await expect(matching.at(-1)?.style.color).toBe('inherit')
    }
  }
}
