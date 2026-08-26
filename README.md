# Twake UI

Monorepo containing shared UI packages for Twake applications.

## Structure

```
twake-ui/
├── packages/
│   ├── twake-mui/          # MUI theme system
│   └── ...                 # Other packages (to be added)
├── package.json            # Root workspace config
└── README.md
```

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
  "version": "0.0.0",
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

No additional release config needed — release-it auto-detects new packages from the workspaces.

## License

MIT
