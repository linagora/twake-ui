# Decisions

Decisions taken on @linagora/twake-mui, oldest first. Append only: a decision that changes gets a new entry that replaces the old one and cites it. Entry format: the `twake-decisions` skill of [linagora/twake-guidelines](https://github.com/linagora/twake-guidelines/blob/main/skills/twake-decisions/SKILL.md).

Categories: UX, UI, Product, Architecture, Infra, Tech.

## 2026-11-23, [UI] The chosen tab of a segmented control is in the primary colour

- Decision: in `Tabs` `segmented`, the chosen tab takes the colour of a chosen standard or `narrowed` tab (`primary.main`) on its raised pill, instead of `text.primary`; a disabled chosen tab greys like the other disabled tabs.
- Decided by: Crash-- (CTO), 2026-11-23, from the vacation choice of Twake Mail ([Crash--/twake-mail-frontend#1123](https://github.com/Crash--/twake-mail-frontend/pull/1123)), whose Figma marks the choice in blue.
- Why: the segmented control was the only tab look that did not show the choice in the primary colour.
- Scope: `Tabs`.

## 2026-11-25, [Tech] The published ESM loads in Node

- Decision: the package compiles with the `nodenext` module resolution, so every relative import names its `.js` file (`./folder/index.js` for a folder) and JSON, `palette.json` of `@linagora/twake-css` included, is imported `with { type: 'json' }`. The images of `InstallFlagshipAppDialog` are data URIs in modules: a module that imports a PNG does not load in Node, and `new URL(…, import.meta.url)` breaks the Jest of the apps that still transform the package to CommonJS. `import('@linagora/twake-mui')` works in plain Node.
- Decided by: Crash-- (CTO), 2026-11-25, [linagora/twake-ui#274](https://github.com/linagora/twake-ui/issues/274)
- Why: Node refuses an ES module import without its extension, so each app and each package built on twake-mui had to transform it in its tests.
- Scope: the build output of the package, `InstallFlagshipAppDialog`.

## 2026-11-26, [Architecture] VirtualizedTable exports its default virtuoso components, not its row

- Decision: the package exports the default `components` of `VirtualizedTable` as `virtualizedTableComponents`, so an app replaces one of them (`{ ...virtualizedTableComponents, Scroller, TableRow }`) without rewriting the others; the row of the table is not exported, a custom row renders the `TableRow` of MUI, styled by the `new` and `disabled` classes of the theme.
- Decided by: JF-Cozy (front-end developer), 2026-11-26, [linagora/twake-drive#4660](https://github.com/linagora/twake-drive/issues/4660)
- Why: the `components` prop replaces the whole default set, and the default row sets its own `selected` and `className` and takes no `ref`, so a drag and drop row cannot build on it.
- Scope: `VirtualizedTable`.
