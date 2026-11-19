# Twake UI

Monorepo containing shared UI packages for Twake applications.

Storybooks: https://linagora.github.io/twake-ui/

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

| Package                 | Scope                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@linagora/twake-css`   | The palette (`palette.json`), its `--twake-*` CSS variables (`dist/vars.css`) and the `.u-*` utility classes (`dist/utils.css`). No JavaScript, usable from any stack. |
| `@linagora/twake-icons` | SVG icons and illustrations as React components.                                                                                                                       |
| `@linagora/twake-mui`   | The MUI theme and components. Builds its theme from twake-css's `palette.json`, emits the same `--twake-*` variables at runtime, and renders twake-icons.              |

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

[Rslint](https://rslint.rs) lints the code and `rs fmt` formats it, both from [Rstack](https://rstack.rs).

### Format all files

```bash
npm run fmt
```

## Workspace Management

This monorepo uses npm workspaces to manage packages.

To run a script in a specific package:

```bash
npm run <script> --workspace=twake-mui
```

### Dependency versions

In `dependencies` and `devDependencies`:

- external packages use an exact version (`"vite": "8.3.1"`), so add them with `npm install --save-exact`;
- internal packages (`@linagora/*`, `cozy-*`, `twake-*`) use a caret range (`"cozy-minilog": "^3.10.1"`).

`peerDependencies` keep ranges: they constrain the apps that install the package (see [Depending on a new version of another package](#depending-on-a-new-version-of-another-package)).

## Release Management

This monorepo uses **multi-semantic-release** with independent versioning for each package. The release process is fully automated via GitHub Actions.

### How it works

```text
PR merged to main
    ↓
CI runs `multi-semantic-release`
    ↓
Detects changed packages since their last tag
    ↓
For each changed package:
    - Bumps version (conventional commits)
    - Updates CHANGELOG.md
    - Publishes to npm
    - Creates separate GitHub release
```

### Depending on a new version of another package

A PR can change several packages. But when a package needs something new from another one (e.g. twake-mui using a new twake-icons icon), split the work:

1. Merge the change in the dependency first and wait for its release.
2. In another PR, raise the range to that released version and use it.

The range cannot target an unreleased version: the workspace still holds the previous version, so npm looks for it on the registry and the install fails.

Internal peer dependencies (`@linagora/*`, `cozy-*`, `twake-*`) use `>=` ranges. Raising their minimum forces consumers to upgrade them, so mark that commit as a breaking change (`feat!:` or a `BREAKING CHANGE:` footer).

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
  "repository": {
    "type": "git",
    "url": "https://github.com/linagora/twake-ui.git",
    "directory": "packages/your-new-package"
  },
  "publishConfig": {
    "access": "public",
    "provenance": true
  },
  "files": ["dist", "CHANGELOG.md", "README.md"]
}
```

`repository.url` must be this repository: npm checks it against the provenance of the publish and rejects a package that does not match.

No additional release config is needed in the repository, but npm must know the package before its first merge to main:

1. Publish a `0.0.0` placeholder by hand: set the version to `0.0.0` locally (do not commit it) and run `npm publish --provenance=false` (`provenance: true` only works from CI).
2. On npmjs.com, add a trusted publisher to the package: `linagora` / `twake-ui` / `ci-cd.yml` / environment `npm`, with "Allow npm publish" checked. The configuration expires unless the package is released within 2 days.

Without it, the release of every package fails until the trusted publisher is configured.

Start at `1.0.0`: the first release semantic-release produces is always `1.0.0`, whatever `package.json` says. If another workspace depends on the new package, its range (`^1.0.0`) must match the workspace version both before and after that release.

## License

MIT
