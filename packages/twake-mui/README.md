# twake-mui

MUI v7 theme system for Twake Calendar and other Twake applications.

**Current version:** 1.1.6

## Installation

```bash
npm install twake-mui
```

## Usage

### Basic Usage

```tsx
import { TwakeMuiThemeProvider } from "twake-mui";

function App() {
  return (
    <TwakeMuiThemeProvider>{/* Your application */}</TwakeMuiThemeProvider>
  );
}
```

### Accessing Theme

```tsx
import { useTheme } from "@mui/material/styles";

function MyComponent() {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  // ...
}
```

## Features

- **Palette System**: Techno-independent color definitions
- **Typography**: Custom typography variants for Twake brand
- **Component Overrides**: Pre-styled Button, TextField, Dialog components
- **MUI v7 Compatible**: Built for Material-UI v7

## Components

### Button

Pre-styled button variants:

- `contained`: Primary button style
- `outlined`: Outlined button style
- `text`: Text button style

### TextField

Pre-styled text field with:

- Outlined input styles
- Error states
- Focus states
- Disabled states

### Dialog/Modal

Pre-styled dialog components:

- Dialog paper styles
- DialogTitle, DialogContent, DialogActions styles

## Typography Variants

All standard MUI typography variants are available:

- h1-h6
- body1, body2
- button
- caption
- overline
- subtitle1, subtitle2

## Development

This package is part of the `twake-ui` monorepo.

### Build

```bash
npm run build
```

### Local Development

To use this package locally in another project:

```bash
# In twake-ui/packages/twake-mui
npm link

# In your project
npm link twake-mui
```

Or use file path in package.json:

```json
{
  "dependencies": {
    "twake-mui": "file:../twake-ui/packages/twake-mui"
  }
}
```

## License

MIT
