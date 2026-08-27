# @linagora/twake-icons

Icon library for Twake applications. Provides SVG icons and illustrations as React components.

## Installation

```bash
npm install @linagora/twake-icons
```

## Usage

### Import individual icons (tree-shakeable)

```tsx
import { Icon, Check, Folder } from '@linagora/twake-icons'

<Icon icon={Check} size={16} />
<Icon icon={Folder} size={24} color="var(--primary)" />
```

### Use sprite identifiers

```tsx
import { Icon, Sprite } from '@linagora/twake-icons'

// Render the sprite once at the root of your app
<Sprite />

// Then use string identifiers anywhere
<Icon icon="check" size={16} />
<Icon icon="folder" color="blue" />
```

### Icon Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `string \| Component \| ReactElement` | Icon identifier, SVGr component, or custom SVG element |
| `size` | `number \| string` | Width and height in pixels |
| `color` | `string` | Fill color |
| `rotate` | `number` | Rotation in degrees |
| `spin` | `boolean` | Apply spinning animation |

## How to add an icon

Add the new icon in `/assets` folder, then optimize it and create the SVGr component and the Sprite:

1. **Remove fill props**
   If your SVG file is an icon (not an illustration), verify that the file doesn't have any `fill` or `fill-opacity` properties. Remove them if necessary, to be able to set the color.

2. **Optimize SVGs**
   ```bash
   npm run svgo
   ```
   Or for a single icon:
   ```bash
   npx svgo assets/ui/new-icon.svg
   ```

3. **Generate SVGr components**
   ```bash
   npm run makeSvgr
   ```
   Or for a single icon:
   ```bash
   npm run makeSvgr -- assets/ui/new-icon.svg
   ```

4. **Regenerate the sprite**
   ```bash
   npm run sprite
   ```

5. **Rebuild and fix lint**
   ```bash
   npm run build && npm run lint:fix
   ```

6. **Check the barrel**
   The barrel export (`src/Icons/index.ts`) is automatically regenerated during build, so verify it's in sync with the generated components.
   ```bash
   npm run check:barrel
   ```

## License

MIT
