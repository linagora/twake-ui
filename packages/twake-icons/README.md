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

Icons are sourced from `cozy-ui`. To add or update icons:

1. **Optimize SVGs:**
   ```bash
   npm run svgo
   ```
   Or for a single icon:
   ```bash
   npx svgo assets/ui/new-icon.svg
   ```

2. **Generate SVGr components:**
   ```bash
   npm run makeSvgr
   ```
   Or for a single icon:
   ```bash
   npm run makeSvgr -- assets/ui/new-icon.svg
   ```

3. **Regenerate the sprite:**
   ```bash
   npm run sprite
   ```

4. **Rebuild before commit:**
   ```bash
   npm run build
   ```

The barrel export (`src/Icons/index.ts`) is automatically regenerated during build.
Run `npm run check:barrel` to verify it's in sync with the generated components.

## License

MIT
