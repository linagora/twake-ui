import { Button, Stack, Chip } from '@mui/material'
import type { SimplePaletteColorOptions } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { TwakeMuiThemeProvider } from '../components/ThemeProvider'
import { makePalette } from '../lib/makePalette'
import type { PaletteJson } from '../lib/types'

const CUSTOM_PALETTE: Partial<PaletteJson> = {
  Primary: {
    50: '#FFF9F6',
    100: '#FFF5F0',
    200: '#FFF1E3',
    300: '#FFD8BF',
    400: '#FFAE7B',
    500: '#FF8D46',
    600: '#F67E35',
    700: '#F66F35',
    800: '#E55B31',
    900: '#7A411E',
    ContrastText: '#fff'
  }
}

const BASE_PALETTE = makePalette('light', CUSTOM_PALETTE)

function ColorSwatch({
  label,
  color
}: {
  label: string
  color: string
}): React.ReactElement {
  return (
    <Stack direction="row" spacing={1}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 4,
          backgroundColor: color,
          border: '1px solid rgba(0,0,0,0.1)'
        }}
      />
      <code style={{ fontSize: 12, color: '#666' }}>{label}</code>
      <code style={{ fontSize: 12 }}>{color}</code>
    </Stack>
  )
}

function ThemePlaygroundContent(): React.ReactElement {
  const primaryMain = (BASE_PALETTE.primary as SimplePaletteColorOptions).main
  const secondaryMain = (BASE_PALETTE.secondary as SimplePaletteColorOptions)
    .main
  const textPrimary = BASE_PALETTE.text!.primary as string
  const textSecondary = BASE_PALETTE.text!.secondary as string
  const backgroundDefault = BASE_PALETTE.background.default
  const backgroundPaper = BASE_PALETTE.background.paper

  return (
    <TwakeMuiThemeProvider palette={CUSTOM_PALETTE}>
      <Stack spacing={4} sx={{ p: 3, minWidth: 640 }}>
        {/* Palette Display */}
        <section>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Palette Colors</h3>
          <Stack spacing={1}>
            <ColorSwatch label="primary.main" color={primaryMain} />
            <ColorSwatch label="secondary.main" color={secondaryMain} />
            <ColorSwatch label="text.primary" color={textPrimary} />
            <ColorSwatch label="text.secondary" color={textSecondary} />
            <ColorSwatch label="background.default" color={backgroundDefault} />
            <ColorSwatch label="background.paper" color={backgroundPaper} />
          </Stack>
        </section>

        {/* Buttons */}
        <section>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Buttons</h3>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary">
                Contained primary
              </Button>
              <Button variant="outlined" color="primary">
                Outlined primary
              </Button>
              <Button variant="text" color="primary">
                Text primary
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="secondary">
                Contained secondary
              </Button>
              <Button variant="outlined" color="secondary">
                Outlined secondary
              </Button>
              <Button variant="text" color="secondary">
                Text secondary
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disabled>
                Disabled
              </Button>
            </Stack>
          </Stack>
        </section>

        {/* Chips */}
        <section>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Chips</h3>
          <Stack direction="row" spacing={2}>
            <Chip label="Primary filled" color="primary" />
            <Chip label="Primary outlined" color="primary" variant="outlined" />
            <Chip label="Secondary filled" color="secondary" />
            <Chip
              label="Secondary outlined"
              color="secondary"
              variant="outlined"
            />
          </Stack>
        </section>

        {/* Typography */}
        <section>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Typography</h3>
          <Stack spacing={0.5}>
            <span
              style={{
                color: textPrimary,
                fontSize: 15
              }}
            >
              text.primary — The quick brown fox
            </span>
            <span
              style={{
                color: textSecondary,
                fontSize: 13
              }}
            >
              text.secondary — The quick brown fox
            </span>
          </Stack>
        </section>

        {/* Backgrounds */}
        <section>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>Backgrounds</h3>
          <Stack direction="row" spacing={2}>
            <Stack
              sx={{
                width: 120,
                height: 64,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <code style={{ fontSize: 10 }}>default</code>
            </Stack>
            <Stack
              sx={{
                width: 120,
                height: 64,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <code style={{ fontSize: 10 }}>paper</code>
            </Stack>
          </Stack>
        </section>
      </Stack>
    </TwakeMuiThemeProvider>
  )
}

const meta: Meta<typeof ThemePlaygroundContent> = {
  title: 'ThemePlayground',
  component: ThemePlaygroundContent,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ThemePlaygroundContent>

export const Docs: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TwakeMuiThemeProvider } from '@linagora/twake-mui'
import type { PaletteJson } from '@linagora/twake-mui'

const CUSTOM_PALETTE: Partial<PaletteJson> = {
  Primary: {
    50: '#FFF9F6', 100: '#FFF5F0', 200: '#FFF1E3', 300: '#FFD8BF',
    400: '#FFAE7B', 500: '#FF8D46', 600: '#F67E35', 700: '#F66F35',
    800: '#E55B31', 900: '#7A411E',
    ContrastText: '#fff'
  }
}

<TwakeMuiThemeProvider palette={CUSTOM_PALETTE}>
  <YourApp />
</TwakeMuiThemeProvider>`
      }
    }
  }
}
