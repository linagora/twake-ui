# @linagora/twake-css

The Twake palette: `palette.json`, the `--twake-*` CSS variables that expose
its values in light and dark mode, and the theme-aware utility classes (`.u-*`)
that replace `cozy-ui/dist/cozy-ui.utils.min.css`.

```
palette.json     the color ramps, the source twake-mui builds its theme from
dist/vars.css    the palette values, as --twake-* custom properties, light and dark
dist/utils.css   the .u-* utility classes
```

`utils.css` reads `vars.css`. Layout, spacing and sizing classes work on their
own; everything that carries a color, a shadow or a stacking level needs the
variables in the page. Two ways to get them there:

## In a React app

```js
import '@linagora/twake-css/dist/utils.css'
```

`TwakeMuiThemeProvider` from `@linagora/twake-mui` emits the variables at
runtime and sets `data-theme` on `<html>`, so `vars.css` is not needed.
twake-mui depends on this package for the palette itself, which is what
keeps a class and a component on the same value.

## Anywhere else: Svelte, a page served by cozy-stack, plain HTML

```html
<link rel="stylesheet" href="@linagora/twake-css/dist/vars.css">
<link rel="stylesheet" href="@linagora/twake-css/dist/utils.css">
```

No JavaScript. The page follows `prefers-color-scheme`; set
`data-theme="light"` or `"dark"` on `<html>` to decide yourself. Any variable can
be used directly in your own CSS, Tailwind included:

```js
// tailwind.config.js
colors: { primary: 'var(--twake-palette-primary-main)' }
```

## Reference

The built files are the reference, and never out of date:

```bash
grep -o -- '--twake-[a-zA-Z-]*' node_modules/@linagora/twake-css/dist/vars.css | sort -u
grep -o '\.u-[a-z0-9-]*' node_modules/@linagora/twake-css/dist/utils.css | sort -u
```

The Storybook lists both, grouped, with live values in each mode.

## Migrating from cozy-ui

See [MIGRATION.md](./MIGRATION.md): variable mapping, removed classes,
deprecated `--zIndex-*`, spacing.

## Development

```bash
npm run build   # dist/vars.css, dist/utils.css
npm run doc     # Storybook on :6008
```
