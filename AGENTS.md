# AGENTS.md - Twake UI Monorepo

The rules in Colors and Conventions apply to the code you write; older code
(avatar gradients, `ColorList`, some overrides…) predates some of them.

## Quick Commands

```bash
# Install dependencies
npm ci

# Build all packages
npm run build

# Lint all packages
npm run lint

# Lint specific package
npx rs lint packages/twake-mui/src

# Format all files
npm run fmt

# Test dry-run release (safe, no publish)
npm run release:dry
```

## Critical Rules

**⚠️ NEVER run `npm run release` locally** - it publishes to npm for real. Releases only happen via GitHub Actions on merge to main.

**⚠️ Always use Node 24** - specified in `.nvmrc`. Other versions will fail.

## Decisions

- Decisions: each package keeps its own `docs/decisions.md` (`packages/*/docs/decisions.md`), mandatory, none at the repo root. Search the log of the package you change before asking a question or proposing a change; record every decision in the log of the package it touches (the main one when it touches several, the others in its Scope line), in the commit that applies it (skill `twake-decisions`).

## Architecture

- **Monorepo**: npm workspaces with independent versioning
- **Packages location**: `packages/*` (currently `twake-css`, `twake-mui` and
  `twake-icons`)
- **MUI version**: twake-mui is on MUI v9
- **Package naming**: All packages use `@linagora/` scope
- **Build output**: Each package outputs to `dist/` (TypeScript compilation)
- **Dependency versions**: exact versions for external packages
  (`npm install --save-exact`), caret ranges for internal ones (`@linagora/*`,
  `cozy-*`, `twake-*`); `peerDependencies` keep their ranges. See "Dependency
  versions" in the README.

## Colors

Every Twake app reads its colours from this repo, so a colour changed here
changes everywhere, in light and dark mode.

- Write a new colour value in the base palette,
  `packages/twake-css/palette.json`, and nowhere else.
- Map palette values to semantic roles in both
  `packages/twake-mui/src/lib/makePalette.ts` and
  `packages/twake-css/src/vars.scss`, for each mode. `test/vars.test.ts` in
  twake-mui only checks that each variable of `vars.css` matches the theme: a
  role missing from `vars.scss` passes, so write both sides yourself.
- In components, stories and apps, use roles only: `theme.vars.palette.*`
  (`primary.main`, `text.secondary`, `action.hover`, `divider`, `border.main`…)
  or the `--twake-palette-*` CSS variables. A hex or `rgba()` literal there
  escapes the palette and the dark mode.
- To add a colour, add a palette entry and a role that reads it. Name them like
  the existing ones: a PascalCase ramp with numeric keys in `palette.json`,
  camelCase roles with `light`, `main`, `dark` and `contrastText` when it is a
  colour family.
- Derive a new hover, selected, focus or disabled tint from the `action.*`
  opacity tokens (`theme.alpha(color, theme.vars.palette.action.selectedOpacity)`),
  so state tints follow one value.

## Conventions

### API and scope

- When cozy-ui already has an API for the need, reuse it (prop name, values,
  default) and extend it so existing values keep their meaning, except: drop
  the props cozy-ui itself deprecates; when MUI v9 moved a prop to another
  component, follow MUI (`<ListItem button>` → `ListItemButton`); keep the
  cozy-ui name only for a plain rename. Ask before porting a legacy or hack
  prop. Open the matching change on cozy-ui in its own PR, for the apps still
  on it.
- Add a variant to a component only when more than one screen uses it, or when
  the Figma library makes it a component of its own, including when a
  twake-guidelines skill suggests adding the missing variant here. A look for
  a single screen comes from the designer as an asset (an illustration)
  passed in as is.
- Build on what MUI and MUI X already do, themed here (overrides,
  `defaultProps`, a provider), before writing a component of your own. A
  wrapper earns its place only for a real composition (a date and a time
  sharing one value).
- Put a context-based library in `peerDependencies`, so the app and twake-mui
  share one copy. When only some apps use it, make it optional
  (`peerDependenciesMeta`) and export its provider from its own subpath,
  mounted apart from `ThemeProvider`, so the other apps neither install nor
  load it: from the `"."` entry they would rely on tree-shaking. This is the
  target for `@mui/x-date-pickers` and `date-fns`, today in `devDependencies`
  with no provider. `date-fns` stays pinned to `2.30.0`, peer included
  (`AdapterDateFnsV2`).
- Fix a bug everywhere it occurs: move the fix into a shared helper and call it
  from each place.

### Code

- Name components and props without a `Cozy` or `Twake` prefix.
- Reuse the twake-css `u-*` utilities (`packages/twake-css/src/utilities`)
  instead of copying their rules into `styled()`.
- Default-export each new component, and export it from its own file in
  `src/index.ts` rather than through another component's `index.tsx`. This
  overrides the named-exports-only rule of twake-guidelines for React
  components; helpers and hooks stay named exports.
- Write functions as arrow functions, never with the `function` keyword
  (`<T,>` for generics in `.tsx`). Add `export` only when other files import
  the function: `export const fn = (args) => {}`. A file-local helper is
  `const fn = (args) => {}`.
- Export from a module only what other files import; the public API is what
  `src/index.ts` lists.
- Any change to the public API (export, prop, option, default value,
  behaviour) is a breaking change, whether or not the apps use it: add a
  `BREAKING CHANGE:` footer with migration guidance. Adding an export or a
  component is not, nor is a visual change that leaves the apps nothing to
  adapt.
- Put callback props (`onX`) last, grouped, in the props interface, the
  destructuring and every call site.
- Name the variant classes the overrides target bare (`.square`, `.small`).
- Hold a class name repeated in a component's styles in a constant, like
  `ICON_CLASS_NAME` in `Empty`, so a typo cannot break the look silently.
- Read `event.currentTarget` before an `await`, and pass the element to a
  callback that runs after it.
- Set `aria-hidden="true"` on decorative icons in every render branch.

### Comments

- Write JSDoc for exported components, their props and exported helpers.
- Comment a constraint the code cannot show (why a lookup goes through the
  element's frame, why a `minWidth`). Delete a comment that restates the code.
- Never name an app, a consumer or cozy-ui in a comment: it implies a
  coupling. The reason for a fix belongs in its commit message.

### Tests

- Name test files `*.test.ts(x)`.
- Test behaviour that can break. Do not test rendering (class names, which
  branch renders), left to the Argos stories, nor what MUI already does
  (forwarding `open`, `onClose`, `aria-modal`).
- In jsdom, `ownerDocument.defaultView` is `window`: mount a test of
  frame-dependent code in an iframe, so it fails if the code uses the app's
  window.
- Restore every global you mock (`navigator.clipboard`) after the test, and
  move a setup shared by several test files into one helper.

## Release Flow (Automated)

```text
PR merged to main
    ↓
CI runs `multi-semantic-release`
    ↓
MSR detects changed packages since their last tag
    ↓
For each changed package:
    - Bumps version (conventional commits)
    - Updates CHANGELOG.md
    - Publishes to npm
    - Creates git tag (e.g. @linagora/twake-mui@2.0.1)
    - Creates separate GitHub release
```

## Adding New Packages

1. Create package in `packages/<name>/`
2. Required in `package.json`:
   - `"name": "@linagora/<name>"`
   - `"version": "1.0.0"` — the first release is always `1.0.0`; a sibling
     workspace depending on it must declare `^1.0.0`, or npm stops linking the
     workspace after the release bot bumps the version (ranges are not rewritten,
     `--deps.bump=ignore`)
   - `"repository"` with `"url": "https://github.com/linagora/twake-ui.git"`
     and `"directory": "packages/<name>"`: npm rejects a publish whose
     provenance does not match it
   - `"publishConfig": { "access": "public", "provenance": true }`
   - `"files": ["dist", "CHANGELOG.md", "README.md"]`
3. No per-package release config: the root `.releaserc.json` applies to all
   workspaces. But npm must know the package before its first merge to main
   (placeholder and trusted publisher, see "npm auth" in CI/CD Notes), or the
   release of every package fails
4. Create `packages/<name>/docs/decisions.md` with the same header as the other packages

## Adding Icons

To add one or more icons to `twake-icons`, follow
[How to add an icon](packages/twake-icons/README.md#how-to-add-an-icon) in the package README.

## Storybook

Inside `packages` folder:

```bash
# Start Storybook development server
npm run doc

# Build static Storybook for deployment
npm run build:doc

# Run visual regression tests with Argos
npm run screenshots
```

Stories are located in:

- `packages/twake-mui/src/components/**/*.stories.tsx` - Component stories (e.g., Avatar)
- `packages/twake-mui/src/stories/*.stories.tsx` - Override showcase stories

When you write or change a story:

- Show a new prop or look in the existing stories: a control in `Default` and a
  section in `Screenshot`, rather than a new story per feature. When the
  component has no `Screenshot` story yet, add one with the `argos` tag.
- When twake-mui has its own component, render it in its stories, not the MUI
  one it wraps.

### Visual Regression Testing

The project uses Argos for visual regression testing. Screenshots are automatically
captured from Storybook stories during CI and compared against baselines.

To add a story to visual regression tests, add `argos` tag to your story:

```typescript
export const MyStory = {
  tags: ['argos']
}
```

## CI/CD Notes

- **Runs on**: PRs and push to main
- **Order**: install → lint → format check → build → test → bundle test
  (`npm run test:bundle` in twake-mui: builds, then bundles a consumer of
  `dist/`) → browser test (`npm run test:browser` in twake-mui, Chromium) →
  release (main only, in its own `release` job once the `build` job passes;
  it publishes the `dist` built by the `build` job and builds nothing itself)
- **npm auth**: OIDC trusted publishing, no npm token. The `release` job runs
  in the `npm` GitHub environment (main only). A new package must first be
  published by hand as a `0.0.0` placeholder (version set to `0.0.0` locally,
  not committed, then `npm publish --provenance=false`), then get a trusted
  publisher on npmjs.com: `linagora` / `twake-ui` / `ci-cd.yml` / environment
  `npm`, with "Allow npm publish" checked. The configuration expires unless
  the package is released within 2 days
- **Uses**: `secrets.GITHUB_TOKEN` (auto-provided, no setup needed)

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) for automatic versioning:

- `feat:` → minor version bump
- `fix:` → patch version bump
- `feat!:` or `BREAKING CHANGE:` → major version bump
