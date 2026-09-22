# Twake UI

Monorepo containing shared UI packages for Twake applications.

## Structure

```
twake-ui/
├── packages/
│   ├── twake-css/          # Palette, CSS variables and utility classes
│   ├── twake-icons/        # SVG icons and illustrations
│   └── twake-mui/          # MUI theme and components
├── package.json            # Root workspace config
└── README.md
```

## Packages

| Package | Scope |
| --- | --- |
| `@linagora/twake-css` | The palette (`palette.json`), its `--twake-*` CSS variables (`dist/vars.css`) and the `.u-*` utility classes (`dist/utils.css`). No JavaScript, usable from any stack. |
| `@linagora/twake-icons` | SVG icons and illustrations as React components. |
| `@linagora/twake-mui` | The MUI theme and components. Builds its theme from twake-css's `palette.json`, emits the same `--twake-*` variables at runtime, and renders twake-icons. |

## Development

### Setup

```bash
npm install
```

### Build all packages

```bash
npm run build
```

### Test all packages

```bash
npm run test
```

### Lint all packages

```bash
npm run lint
```

## Workspace Management

This monorepo uses npm workspaces to manage packages.

To run a script in a specific package:

```bash
npm run <script> --workspace=twake-mui
```

## Release Management

This monorepo uses **release-it** with independent versioning for each package. The release process is fully automated via GitHub Actions.

### How it works

```text
PR merged to main
    ↓
CI runs `release-it --ci`
    ↓
Detects changed packages since their last tag
    ↓
For each changed package:
    - Bumps version (conventional commits)
    - Updates CHANGELOG.md
    - Publishes to npm
    - Creates separate GitHub release
```

### DO NOT MAKES CHANGES FOR SEVERAL PACKAGES IN THE SAME PR

It will cause the release to fail. The ci will try to bump the version for each package and will try to install unreleased packages making the release fail.
The solution is to merge your modification first, wait for a new release, and then use it in another PR.

### Dry-run

```bash
npm run release:dry
```

## Adding New Packages

Create your package in `packages/<name>/` with the required `package.json` fields:

```json
{
  "name": "@linagora/your-new-package",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "dist",
    "CHANGELOG.md",
    "README.md"
  ]
}
```

No additional release config needed — the release tooling auto-detects new packages from the workspaces.

Start at `1.0.0`: the first release semantic-release produces is always `1.0.0`, whatever `package.json` says. If another workspace depends on the new package, its range (`^1.0.0`) must match the workspace version both before and after that release.

## License

MIT
