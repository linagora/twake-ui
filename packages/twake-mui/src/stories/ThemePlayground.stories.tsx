import { Button, Stack, Chip } from '@mui/material'
import type { SimplePaletteColorOptions } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { TwakeMuiThemeProvider } from '../components/ThemeProvider'
import { makePalette } from '../lib/makePalette'
import type { PaletteJson } from '../lib/types'

const customPalette: PaletteJson = {
  Primary: {
    '50': '#FFF9F6',
    '100': '#FFF5F0',
    '200': '#FFF1E3',
    '300': '#FFD8BF',
    '400': '#FFAE7B',
    '500': '#FF8D46',
    '600': '#F67E35',
    '700': '#F66F35',
    '800': '#E55B31',
    '900': '#7A411E',
    ContrastText: '#fff'
  },
  Secondary: {
    '50': '#E5FFFF',
    '100': '#B3FFFF',
    '200': '#80FFFF',
    '300': '#4DFFFF',
    '400': '#1AFFFF',
    '500': '#00FFFF',
    '600': '#00CCCC',
    '700': '#009999',
    '800': '#006666',
    '900': '#003333',
    ContrastText: '#000'
  },
  Error: {
    '50': '#FFE5E5',
    '100': '#FFB3B3',
    '200': '#FF8080',
    '300': '#FF4D4D',
    '400': '#FF1A1A',
    '500': '#FF0000',
    '600': '#CC0000',
    '700': '#990000',
    '800': '#660000',
    '900': '#330000',
    ContrastText: '#fff'
  },
  Warning: {
    '50': '#FFFFE5',
    '100': '#FFFFB3',
    '200': '#FFFF80',
    '300': '#FFFF4D',
    '400': '#FFFF1A',
    '500': '#FFFF00',
    '600': '#CCCC00',
    '700': '#999900',
    '800': '#666600',
    '900': '#333300',
    ContrastText: '#000'
  },
  Success: {
    '50': '#E5FFE5',
    '100': '#B3FFB3',
    '200': '#80FF80',
    '300': '#4DFF4D',
    '400': '#1AFF1A',
    '500': '#00FF00',
    '600': '#00CC00',
    '700': '#009900',
    '800': '#006600',
    '900': '#003300',
    ContrastText: '#000'
  },
  Info: {
    '50': '#F0E5FF',
    '100': '#D1B3FF',
    '200': '#B380FF',
    '300': '#944DFF',
    '400': '#751AFF',
    '500': '#6600FF',
    '600': '#5200CC',
    '700': '#3D0099',
    '800': '#290066',
    '900': '#140033'
  },
  Grey: {
    '50': '#F2F2F2',
    '100': '#00FF00',
    '200': '#CCCCCC',
    '300': '#B3B3B3',
    '400': '#808080',
    '500': '#808080',
    '600': '#666666',
    '700': '#4D4D4D',
    '800': '#00FF00',
    '900': '#FF00FF',
    A100: '#FFFFFF',
    A200: '#F0F0F0',
    A400: '#00FF00',
    A700: '#262626',
    A900: '#0D0D0D'
  },
  Common: {
    black: '#FF0000',
    white: '#0000ff'
  }
}

const BASE_PALETTE = makePalette('light', customPalette)

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
    <TwakeMuiThemeProvider themeOptions={{ palette: BASE_PALETTE }}>
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
        code: `import { makePalette } from '@linagora/twake-mui'
import type { PaletteJson } from '@linagora/twake-mui'

const customPalette: PaletteJson = {
  Primary: {
    '500': '#FF00AA',
    ContrastText: '#fff'
  },
  Secondary: {
    '500': '#00FFFF',
    ContrastText: '#000'
  },
  // ...Error, Warning, Success, Info, Grey, Common
}

// Generate a full MUI palette from your design tokens
const basePalette = makePalette('light', customPalette)

<TwakeMuiThemeProvider
  themeOptions={{palette: basePalette}}
>
  <YourApp />
</TwakeMuiThemeProvider>`
      }
    }
  }
}
