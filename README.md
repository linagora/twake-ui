# Twake UI

Monorepo containing shared UI packages for Twake applications.

## Structure

```
twake-ui/
├── packages/
│   ├── twake-mui/          # MUI v7 theme system
│   └── ...                 # Other packages (to be added)
├── package.json            # Root workspace config
└── README.md
```

## Packages

### twake-mui

MUI v7 theme system for Twake Calendar and other Twake applications.

- Provides palette, typography, and component overrides
- Focuses on Button, TextField, Dialog/Modal components
- References cozy-ui structure but optimized for MUI v7

See [packages/twake-mui/README.md](packages/twake-mui/README.md) for more details.

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

## License

MIT
