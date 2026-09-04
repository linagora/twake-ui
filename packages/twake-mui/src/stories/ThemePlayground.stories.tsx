import { Button, Stack, Switch, Chip } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'

import { TwakeMuiThemeProvider } from '../components/ThemeProvider'
import { makePalette } from '../lib/makePalette'
import paletteData from '../lib/palette.json'
import type { PaletteJson } from '../lib/types'

const DEFAULT_PRIMARY = paletteData.Primary[400]
const DEFAULT_SECONDARY = paletteData.Grey[400]

// Custom palette from twake-calendar-frontend
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
    '50': '#F9FCFF',
    '100': '#F6F9FC',
    '200': '#F3F6F9',
    '300': '#F2F6FA',
    '400': '#F1F4F7',
    '500': '#F0F2F5',
    '600': '#EDF0F2',
    '700': '#DAD9DB',
    '800': '#BEBEBF',
    '900': '#7A797A',
    ContrastText: '#000000e6'
  },
  Error: {
    '50': '#FFFBFE',
    '100': '#FCEEEE',
    '200': '#FFD2D7',
    '300': '#FF939D',
    '400': '#FF7A87',
    '500': '#FF4D5E',
    '600': '#FF3347',
    '700': '#D32C3C',
    '800': '#B52C39',
    '900': '#7A1E27',
    ContrastText: '#fff'
  },
  Warning: {
    '50': '#FFF8E1',
    '100': '#FFECB3',
    '200': '#FFE082',
    '300': '#FFD54F',
    '400': '#FFCA28',
    '500': '#FFB300',
    '600': '#FF8F00',
    '700': '#FF6F00',
    '800': '#B5672C',
    '900': '#281C07',
    ContrastText: '#fff'
  },
  Success: {
    '50': '#F3FFF5',
    '100': '#E3FFE7',
    '200': '#B9F6CA',
    '300': '#97ECA1',
    '400': '#66E475',
    '500': '#38C949',
    '600': '#00C853',
    '700': '#00AD48',
    '800': '#245538',
    '900': '#08250B',
    ContrastText: '#fff'
  },
  Info: {
    '50': '#EDFFFF',
    '100': '#D4FEFF',
    '200': '#AFFDFF',
    '300': '#86F5F7',
    '400': '#4EE2E5',
    '500': '#1DE9B6',
    '600': '#00BFA5',
    '700': '#00796B',
    '800': '#004345',
    '900': '#002526'
  },
  Grey: {
    '50': '#FBFDFF',
    '100': '#F3F6F9',
    '200': '#EDF2F7',
    '300': '#E1E3E6',
    '400': '#C5C7CA',
    '500': '#AAACAE',
    '600': '#909294',
    '700': '#757779',
    '800': '#4E5052',
    '900': '#424244',
    A100: '#FCFCFC',
    A200: '#E5ECF3',
    A400: '#37383A',
    A700: '#5D6169',
    A900: '#1C1B1F'
  },
  Common: {
    black: '#000',
    white: '#fff'
  }
}

function ThemePlaygroundContent(): React.ReactElement {
  const [primary, setPrimary] = useState(DEFAULT_PRIMARY)
  const [secondary, setSecondary] = useState(DEFAULT_SECONDARY)
  const [useCustomPalette, setUseCustomPalette] = useState(false)
  const palette = makePalette('light', customPalette)

  const themeOptions = useCustomPalette
    ? { palette }
    : {
        palette: {
          primary: { main: primary },
          secondary: { main: secondary }
        }
      }
  return (
    <TwakeMuiThemeProvider themeOptions={themeOptions}>
      <Stack
        spacing={4}
        sx={{
          p: 3,
          minWidth: 600
        }}
      >
        {/* Controls */}
        <section>
          <h3 style={{ marginBottom: '12px' }}>Palette override</h3>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <label htmlFor="primary-picker" style={{ fontSize: 14 }}>
                Primary
              </label>
              <input
                id="primary-picker"
                type="color"
                value={primary}
                onChange={e => setPrimary(e.target.value)}
                disabled={useCustomPalette}
                style={{
                  width: 40,
                  height: 32,
                  cursor: useCustomPalette ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: 'none'
                }}
              />
              <code style={{ fontSize: 12 }}>{primary}</code>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <label htmlFor="secondary-picker" style={{ fontSize: 14 }}>
                Secondary
              </label>
              <input
                id="secondary-picker"
                type="color"
                value={secondary}
                onChange={e => setSecondary(e.target.value)}
                disabled={useCustomPalette}
                style={{
                  width: 40,
                  height: 32,
                  cursor: useCustomPalette ? 'not-allowed' : 'pointer',
                  border: 'none',
                  background: 'none'
                }}
              />
              <code style={{ fontSize: 12 }}>{secondary}</code>
            </Stack>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setPrimary(DEFAULT_PRIMARY)
                setSecondary(DEFAULT_SECONDARY)
                setUseCustomPalette(false)
              }}
            >
              Reset
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', mt: 2 }}
          >
            <Switch
              size="small"
              checked={useCustomPalette}
              onChange={e => setUseCustomPalette(e.target.checked)}
            />
            <span style={{ fontSize: 14 }}>
              Use custom calendar palette (orange primary)
            </span>
          </Stack>
          {useCustomPalette && (
            <code style={{ fontSize: 12, display: 'block', marginTop: 8 }}>
              Primary: {customPalette.Primary?.[600]} | Secondary:{' '}
              {customPalette.Secondary?.[500]}
            </code>
          )}
        </section>

        {/* Buttons */}
        <section>
          <h3 style={{ marginBottom: '12px' }}>Buttons</h3>
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
          <h3 style={{ marginBottom: '12px' }}>Chips</h3>
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

        {/* Switch */}
        <section>
          <h3 style={{ marginBottom: '12px' }}>Switch</h3>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Switch defaultChecked color="primary" />
            <Switch defaultChecked color="secondary" />
            <Switch disabled />
          </Stack>
        </section>
      </Stack>
    </TwakeMuiThemeProvider>
  )
}

function ThemePlayground(): React.ReactElement {
  return <ThemePlaygroundContent />
}

const meta: Meta<typeof ThemePlayground> = {
  title: 'ThemePlayground',
  component: ThemePlayground,
  parameters: { layout: 'centered' },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ThemePlayground>

export const Docs: Story = {}
