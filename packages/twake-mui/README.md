# twake-mui

MUI v7 theme system for Twake Calendar and other Twake applications.

## Requirements

You need to use Node 24+

## Installation

```bash
npm install @linagora/twake-mui
```

Don't forget to also install peerDependencies (see package.json)

## Usage

### Basic Usage

Wrap your app with the Provider to get the Material-UI theme

```tsx
import { TwakeMuiThemeProvider } from '@linagora/twake-mui'

function App() {
  return (
    <TwakeMuiThemeProvider>{/* Your application */}</TwakeMuiThemeProvider>
  )
}
```

Then you can use Material-UI components from Twake-mui

```tsx
import { Button } from '@linagora/twake-mui'

function Component() {
  return (
    <Button>Label</Button>
  )
}
```

### Accessing Theme

```tsx
import { useTheme } from '@linagora/twake-mui'

function MyComponent() {
  const theme = useTheme()
  const primaryColor = theme.palette.primary.main
  // ...
}
```

## Features

- **Palette System**: Techno-independent color definitions
- **Component Overrides**: Pre-styled Button, TextField, Dialog components
- **MUI v7 Compatible**: Built for Material-UI v7

## Development

This package is part of the `twake-ui` monorepo.

### Build

```bash
npm run build
```

### Storybook

Use Storybook for isolated component development and visual testing:

```bash
# Start Storybook development server
npm run doc

# Build static Storybook
npm run build:doc
```

Stories are located in:
- `src/components/**/*.stories.tsx` - Component stories (e.g., Avatar)
- `src/stories/*.stories.tsx` - Override showcase stories (Button, Input, Dialog, etc.)

Access Storybook at http://localhost:6006

### Visual Regression Testing

We use Argos for visual regression testing. Screenshots are automatically captured from Storybook stories during CI.

To run visual tests locally (requires ARGOS_TOKEN):

```bash
npm run build:doc
npm run screenshots
```

To add visual regression coverage to a story:

```typescript
export const MyStory = {
  tags: ['argos']
}
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
    "@linagora/twake-mui": "file:../twake-ui/packages/twake-mui"
  }
}
```

### About dependencies

Because of inter-dependencies between these packages:
- `storybook`, `@storybook/*`
- `vite`, `@vitejs/*`
- `vitest`, `@vitest/*`
- `@argos-ci/*`, `playwright`

you may encounter problem to install packages. So you can:

```bash
rm -rf node_modules packages/twake-mui/node_modules package-lock.json
npm install
```

We can maybe use **pnpm** in the future that support hoisting disabling via `.npmrc`

## License

MIT
