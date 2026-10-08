# twake-mui

MUI v9 theme system for Twake Calendar and other Twake applications.

## Requirements

You need to use Node 24+

## Installation

```bash
npm install @linagora/twake-mui
```

Don't forget to also install peerDependencies (see package.json)

`@linagora/twake-css` is one of them: twake-mui builds its theme from its
`palette.json`, and some components (NavItem, NavDropdown, VirtualizedTable)
use its `.u-*` utility classes. Import the stylesheet once in your app:

```js
import '@linagora/twake-css/dist/utils.css'
```

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

### Apps embedded in TwakeSpace

TwakeSpace shows an app of a space's tab in a frame named `twake-embed-<app>`.
Next to it, it puts an overlay over its whole page: a second frame, named
`twake-embed-<app>:overlay`, on `<app origin>/embed/overlay.html`. The app
renders its dialogs, drawers and docked windows into the overlay, so they sit
on TwakeSpace's page instead of inside the app's frame, with no change to its
`Dialog` or `Drawer` calls.

The contract:

- The app serves `/embed/overlay.html`: an empty page, no script, with
  `html, body { background: transparent; color-scheme: normal }`.
- The app reports the region it draws in with `overlayRegionMessage(region)`,
  posted to TwakeSpace: `'full'` while something blocks the page (a dialog, a
  menu), else the boxes it draws. TwakeSpace shows that region only, and the
  rest of its page keeps its clicks.

In the app:

```tsx
import {
  connectSpaceOverlay,
  overlayRegionMessage,
  overlayThemeOptions,
  OverlayPortal,
  SpaceOverlayProvider,
  TwakeMuiThemeProvider
} from '@linagora/twake-mui'

// Null outside TwakeSpace: everything renders in place
const overlay = connectSpaceOverlay(region => {
  window.parent.postMessage(overlayRegionMessage(region), SPACE_ORIGIN)
})
const themeOptions = overlay ? overlayThemeOptions(overlay) : {}

function App() {
  return (
    <TwakeMuiThemeProvider themeOptions={themeOptions}>
      <SpaceOverlayProvider overlay={overlay}>
        {/* Dialogs and drawers go to the overlay through the theme */}
        <OverlayPortal>{/* a docked window, such as a composer */}</OverlayPortal>
      </SpaceOverlayProvider>
    </TwakeMuiThemeProvider>
  )
}
```

What renders on the overlay lives in another document: use `ownerDocument`
rather than `document`, and `nodeType` rather than `instanceof`.

In TwakeSpace, `OverlayFrame` is the overlay: it takes the region from
`parseOverlayRegionMessage`, checked to come from the app's frame, through
`overlayClipPath`.

## Features

- **Palette System**: Techno-independent color definitions
- **Component Overrides**: Pre-styled Button, TextField, Dialog components
- **MUI v9 Compatible**: Built for Material-UI v9

## Development

This package is part of the `twake-ui` monorepo

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
