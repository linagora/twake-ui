import { Icon, Plus, Stop } from '@linagora/twake-icons'
import { Box, Stack } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Button, ButtonProps } from '../components/Button'

const variants = ['contained', 'outlined', 'ghost', 'text'] as const
const sizes = ['small', 'medium', 'large'] as const
const colors = [
  'inherit',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info'
] as const

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: variants },
    color: { control: 'select', options: colors },
    size: { control: 'select', options: sizes },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'contained',
    children: 'Button'
  }
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <section>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <Stack direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {children}
    </Stack>
  </section>
)

// One column per props set, one button per variant, as the cozy-ui doc does
const Column: React.FC<{ title: string; props?: ButtonProps }> = ({
  title,
  props
}) => (
  <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
    <div>{title}</div>
    {variants.map(variant => (
      <Button key={variant} variant={variant} {...props}>
        {variant}
      </Button>
    ))}
  </Stack>
)

// Visual Regression - All variants combined
export const Screenshot: Story = {
  tags: ['argos'],
  render: () => (
    <Stack spacing={4}>
      <Section title="Default">
        <Column title="default" />
        <Column title="disabled" props={{ disabled: true }} />
        <Column title="loading" props={{ loading: true }} />
      </Section>

      <Section title="legacy variants">
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
      </Section>

      <Section title="Sizes">
        {sizes.map(size => (
          <Column key={size} title={size} props={{ size }} />
        ))}
      </Section>

      <Section title="Icons">
        <Column title="startIcon" props={{ startIcon: <Icon icon={Plus} /> }} />
        <Column title="endIcon" props={{ endIcon: <Icon icon={Plus} /> }} />
        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
          <div>label is only icon</div>
          {variants.map(variant => (
            <Stack key={variant} direction="row" spacing={2}>
              <Button variant={variant}>
                <Icon icon={Plus} />
              </Button>
              <Button variant={variant} disabled>
                <Icon icon={Plus} />
              </Button>
            </Stack>
          ))}
        </Stack>
        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
          <div>round icon button</div>
          {variants.map(variant => (
            <Stack key={variant} direction="row" spacing={2}>
              {[false, true].map(disabled => (
                <Button
                  key={String(disabled)}
                  variant={variant}
                  size="small"
                  disabled={disabled}
                  sx={{
                    minWidth: 'auto',
                    minHeight: 'auto',
                    width: 32,
                    height: 32,
                    padding: 0,
                    borderRadius: '50%'
                  }}
                >
                  <Icon icon={Stop} size={12} />
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>
      </Section>

      <Section title="Icons with sizes">
        {(['startIcon', 'endIcon'] as const).map(position =>
          sizes.map(size => (
            <Column
              key={position + size}
              title={`${position} - ${size}`}
              props={{ size, [position]: <Icon icon={Plus} /> }}
            />
          ))
        )}
      </Section>

      <Section title="Colors">
        {colors.map(color => (
          <Column key={color} title={color} props={{ color }} />
        ))}
      </Section>

      <Section title="Disabled colors">
        {colors.map(color => (
          <Column key={color} title={color} props={{ color, disabled: true }} />
        ))}
      </Section>

      <Section title="Loading colors">
        {colors.map(color => (
          <Column key={color} title={color} props={{ color, loading: true }} />
        ))}
      </Section>

      <Section title="Long label">
        {sizes.map(size => (
          <Stack key={size} spacing={1} sx={{ width: 128 }}>
            <div>{size}</div>
            {variants.map(variant => (
              <Box key={variant}>
                <Button variant={variant} size={size}>
                  {variant} with long label
                </Button>
              </Box>
            ))}
          </Stack>
        ))}
      </Section>
    </Stack>
  )
}
