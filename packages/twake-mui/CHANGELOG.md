# @linagora/twake-mui [8.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@7.1.0...@linagora/twake-mui@8.0.0) (2026-09-18)


### Bug Fixes

* **twake-mui:** Anchor the static Snackbar story top left ([e1cee47](https://github.com/linagora/twake-ui/commit/e1cee476de86ec828cd836b5ce5dd2925360ff29))
* **twake-mui:** Center the Alert message vertically ([38cb5c2](https://github.com/linagora/twake-ui/commit/38cb5c2200adcaa8b9348fca235a54698b5e26e8))
* **twake-mui:** Clean old Avatar override ([202ffb6](https://github.com/linagora/twake-ui/commit/202ffb652010dee61e61b0386a4fbe45f6074859))
* **twake-mui:** Clean old Button override ([f0c45eb](https://github.com/linagora/twake-ui/commit/f0c45eb10e4610176509a1fd89179dcd43d4144a))
* **twake-mui:** Clean old Dialog override ([50544ef](https://github.com/linagora/twake-ui/commit/50544ef9426294d0d54a843e61d04b829cb914c2))
* **twake-mui:** Clean old TextField override ([23b4253](https://github.com/linagora/twake-ui/commit/23b42530b26909abd822e6da8b99b250f5fead39))
* **twake-mui:** Draw the secondary Switch in the success colour like cozy-ui ([cff53f0](https://github.com/linagora/twake-ui/commit/cff53f0cc0c7f0098843d6f5c0acc5dd9ca4553d))
* **twake-mui:** Emit colorSchemes with our own tokens for both modes ([962054b](https://github.com/linagora/twake-ui/commit/962054b74fa214494b6786bd3bc2ce4c98fd8714))
* **twake-mui:** Replace the runtime lodash import with @mui/utils deepmerge ([e6940ff](https://github.com/linagora/twake-ui/commit/e6940ff4d99987ea49ef7a370c01aef43e862373))
* **twake-mui:** Thread mode into ThemeProvider's defaultMode ([1f98a09](https://github.com/linagora/twake-ui/commit/1f98a09b4421497b50717bc36353043838a36c63))
* **twake-mui:** Use the 16px Alert icons of cozy-ui ([c781a7d](https://github.com/linagora/twake-ui/commit/c781a7dca3ccacf04c94eb9dd7b0f14b4fcecf70))


### Features

* Expose cssVariables in TypeScript ([23a151e](https://github.com/linagora/twake-ui/commit/23a151eaf47287d1cc49364073d10fd0acceccc9))
* **twake-mui:** Accept the primary and secondary Button variants of cozy-ui ([daf67fb](https://github.com/linagora/twake-ui/commit/daf67fb9544a11338556201657a6f0e687aab8cd))
* **twake-mui:** Let apps customize the whole theme ([9af16db](https://github.com/linagora/twake-ui/commit/9af16db3720708f79d69bf48c14522ef65b6b7cc))
* **twake-mui:** Migrate Alert from cozy-ui ([916405d](https://github.com/linagora/twake-ui/commit/916405d6c2ce25bd83c445a47ba240303291a7b8))
* **twake-mui:** Migrate Avatar from cozy-ui ([214787f](https://github.com/linagora/twake-ui/commit/214787fbb514b1fe7b510234405821f0256e34e6))
* **twake-mui:** Migrate Badge from cozy-ui ([3d9509d](https://github.com/linagora/twake-ui/commit/3d9509d318e048505bee95ce80f5369da9fb25b5))
* **twake-mui:** Migrate Button from cozy-ui ([704f267](https://github.com/linagora/twake-ui/commit/704f267cd13f9998faf3fbb095b3ab798b518950))
* **twake-mui:** Migrate Checkbox from cozy-ui ([5281cb1](https://github.com/linagora/twake-ui/commit/5281cb1c5eea50ec24bfb528106f13cfb705572a))
* **twake-mui:** Migrate Dialog from cozy-ui ([d420cf5](https://github.com/linagora/twake-ui/commit/d420cf5c4f9e7aa37c60f6122fd0e903586e046b))
* **twake-mui:** Migrate Divider from cozy-ui ([44e1d6c](https://github.com/linagora/twake-ui/commit/44e1d6cc13f612a2295895f4be03856eaf90c7a9))
* **twake-mui:** Migrate Radio from cozy-ui ([effd21f](https://github.com/linagora/twake-ui/commit/effd21fddab6caf43a7e480b16cbd6e93611c34b))
* **twake-mui:** Migrate Snackbar from cozy-ui ([56f2cac](https://github.com/linagora/twake-ui/commit/56f2cac2d632d19bab976ccee9e70f1b20e5ffdb))
* **twake-mui:** Migrate Switch from cozy-ui ([545280b](https://github.com/linagora/twake-ui/commit/545280bd72ef81eb62868e7f8b3dc7e058924466))
* **twake-mui:** Migrate Tabs from cozy-ui ([076ff98](https://github.com/linagora/twake-ui/commit/076ff986612d447c97385898faf10d4ba50bcca1))
* **twake-mui:** Migrate TextField from cozy-ui ([6a4fd77](https://github.com/linagora/twake-ui/commit/6a4fd77ec5e49c76603b7bd8cd899157ef72fa6b))
* **twake-mui:** Migrate Typography from cozy-ui ([7f59c34](https://github.com/linagora/twake-ui/commit/7f59c34e4f0a6502f8a30e676c9d7bb2a48f3025))
* **twake-mui:** Re-export useColorScheme for runtime theme switching ([f3ed328](https://github.com/linagora/twake-ui/commit/f3ed328d45c6b5006403f975a5f07447f5ef2172))


### BREAKING CHANGES

* **twake-mui:** You must use `palette` prop instead of
`themeOptions` of `TwakeMuiThemeProvider` to override
the palette

# @linagora/twake-mui [7.1.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@7.0.0...@linagora/twake-mui@7.1.0) (2026-09-10)


### Bug Fixes

* **twake-mui:** Clean old IconButton override ([b5a7733](https://github.com/linagora/twake-ui/commit/b5a7733ad9451ea9950e93a787133a2f9bf951d5))


### Features

* **twake-mui:** Migrate IconButton from cozy-ui ([d6aca04](https://github.com/linagora/twake-ui/commit/d6aca0454195f1d3ffd5170b2463f5bec9254678))

# @linagora/twake-mui [7.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@6.0.0...@linagora/twake-mui@7.0.0) (2026-09-08)


### Bug Fixes

* **theme:** Align breakpoint values on cozy-ui bounds ([0fb7dd0](https://github.com/linagora/twake-ui/commit/0fb7dd0bb73e845cb2c62ea1c45f28016c2f9a31))


### Features

* Add useBreakpoints hook ([f7780d5](https://github.com/linagora/twake-ui/commit/f7780d5d2fbb194752688c54ec4421e8b51fa83e))


### BREAKING CHANGES

* **theme:** theme.breakpoints.values move from
{sm:480, md:768, lg:1023, xl:1200} to {sm:544, md:769, lg:1024,
xl:1201}. Consumers calling breakpoints.up/down/between keep the same
call sites but resolve at the cozy-ui thresholds. down('sm') now
covers up to 543px instead of 479px.

# @linagora/twake-mui [6.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@5.2.0...@linagora/twake-mui@6.0.0) (2026-09-08)


### Features

* **twake-mui:** Drop app-specific overrides from the theme ([b67cec4](https://github.com/linagora/twake-ui/commit/b67cec4bd20ebc9c04d998966e0f8c00c72830e1))
* **twake-mui:** Remove inert rules from light overrides ([d50595c](https://github.com/linagora/twake-ui/commit/d50595c35ac30e6e2a32be74a0cde5b45798cc44))


### BREAKING CHANGES

* **twake-mui:** Custom style for `Popover`, `Backdrop`,
`SwipeableDrawer` and `ListItem inside Accordion` has been
removed
* **twake-mui:** size="large" no longer typechecks on TextField and InputBase.

# @linagora/twake-mui [5.2.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@5.1.1...@linagora/twake-mui@5.2.0) (2026-09-08)


### Bug Fixes

* **twake-mui:** Type background.contrast on the MUI palette ([0985fcb](https://github.com/linagora/twake-ui/commit/0985fcbc880b73575ffd817ab70b724979d74481))


### Features

* **twake-mui:** Add border and text.icon palette keys from cozy-ui ([9082d24](https://github.com/linagora/twake-ui/commit/9082d2416ad8be62772627bebe4daa27f4eabeca))
* **twake-mui:** Align elevation shadows with cozy-ui ([64d3d5c](https://github.com/linagora/twake-ui/commit/64d3d5cce9e02ca013317ced302ba557a03d9de3))

## @linagora/twake-mui [5.1.1](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@5.1.0...@linagora/twake-mui@5.1.1) (2026-09-08)


### Bug Fixes

* Removed hardcoded data from makeLightOverrides ([df271e0](https://github.com/linagora/twake-ui/commit/df271e0c4e92e98854251804a5dbc0f20d24bbbd))
* Removed theme variable from makeLightOverrides ([111b4bb](https://github.com/linagora/twake-ui/commit/111b4bb86e38a995fda7d7516c60d7c634c93816))

# @linagora/twake-mui [5.1.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@5.0.0...@linagora/twake-mui@5.1.0) (2026-09-01)


### Features

* **twake-mui:** Add Apptitle component ([4e9cf51](https://github.com/linagora/twake-ui/commit/4e9cf51c3c7fbceeed3fb99cfac0a0028ee0b12f))

# @linagora/twake-mui [5.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.3.1...@linagora/twake-mui@5.0.0) (2026-08-31)


### Bug Fixes

* Widen the twake-icons peer range in twake-mui ([c74da60](https://github.com/linagora/twake-ui/commit/c74da605d852d9e6239825a6ec53f05f407206f8))


### BREAKING CHANGES

* twake-mui no longer pins a single exact twake-icons version.
You must have "@linagora/twake-icons": "^2.10.0". A consumer can now resolve any
2.x from 2.10.0 upward, so it no longer gets the one guaranteed version it used
to.

## @linagora/twake-mui [4.3.1](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.3.0...@linagora/twake-mui@4.3.1) (2026-08-31)


### Dependencies

* **@linagora/twake-icons:** upgraded to 2.10.0

# @linagora/twake-mui [4.3.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.2.0...@linagora/twake-mui@4.3.0) (2026-08-27)


### Features

* Override chip component ([70b6e72](https://github.com/linagora/twake-ui/commit/70b6e720bff2e672940ef01963877671de531121))

# @linagora/twake-mui [4.2.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.1.1...@linagora/twake-mui@4.2.0) (2026-08-27)


### Features

* Update palette to match cozy-ui palette ([1102658](https://github.com/linagora/twake-ui/commit/11026581150e966982672a724aaa2c7c099cc896))

## @linagora/twake-mui [4.1.1](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.1.0...@linagora/twake-mui@4.1.1) (2026-08-27)


### Dependencies

* **@linagora/twake-icons:** upgraded to 2.9.0

# @linagora/twake-mui [4.1.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@4.0.0...@linagora/twake-mui@4.1.0) (2026-08-26)


### Features

* **twake-mui:** Add AppTitle ([6c7113c](https://github.com/linagora/twake-ui/commit/6c7113ce243fb381212e1b33a12b8ef6342abd38))


### Reverts

* **twake-mui:** Revert Apptitle addition ([3700530](https://github.com/linagora/twake-ui/commit/37005305b880d7a7fb11b6f4c800efdb5e9a03d0))


### Dependencies

* **@linagora/twake-icons:** upgraded to 2.8.0

# @linagora/twake-mui [4.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@3.0.0...@linagora/twake-mui@4.0.0) (2026-07-28)


### Bug Fixes

* **twake-mui:** Remove forced grey color for Typography ([6bbd9e6](https://github.com/linagora/twake-ui/commit/6bbd9e6609356719bd2d0ce08660e079fc9d6e8c))


### chore

* **twake-mui:** Add @linagora/twake-icons as dependency ([d38157a](https://github.com/linagora/twake-ui/commit/d38157a0a1edc02be8450e2df0631bb492f18118))


### Features

* **twake-mui:** Add AccordionSummary cozy-ui style overrides with default expand icon ([30d8402](https://github.com/linagora/twake-ui/commit/30d840288a098d9e6af83422182a3e2e84dfb494))
* **twake-mui:** Add Fab cozy-ui style overrides with medium size default ([2d6b0ed](https://github.com/linagora/twake-ui/commit/2d6b0ede0d65e73c5c80e58d678cd894ec6ba4de))
* **twake-mui:** Add Tooltip cozy-ui style overrides with arrow by default ([ab349eb](https://github.com/linagora/twake-ui/commit/ab349ebc1efe3af8517a74dbab1efafe608e811e))
* **twake-mui:** Copy Typography style from cozy-ui ([a43378a](https://github.com/linagora/twake-ui/commit/a43378a019bb369dcb2e5debd0baa5f2355941a7))


### BREAKING CHANGES

* **twake-mui:** You must have `"@linagora/twake-icons": "^2.7.0"`

# @linagora/twake-mui [3.0.0](https://github.com/linagora/twake-ui/compare/@linagora/twake-mui@2.0.0...@linagora/twake-mui@3.0.0) (2026-07-27)


### Features

* **twake-mui:** Export mui/lab components and upgrade mui ([9b1d516](https://github.com/linagora/twake-ui/commit/9b1d5162464daa8bfbb8da74c001c0ade3bf0cf4))


### BREAKING CHANGES

* **twake-mui:** You must have `"@mui/material": "^9.2.0"` and "@mui/lab": "^9.0.0-beta.6"

# [2.0.0](https://github.com/linagora/twake-ui/compare/v1.6.1...v2.0.0) (2026-06-10)


* Merge pull request [#23](https://github.com/linagora/twake-ui/issues/23) from linagora/migrate-to-mui-v9 ([a0103e7](https://github.com/linagora/twake-ui/commit/a0103e76cc988ceb49611beaa72cd3df09425673))


### Bug Fixes

* **CI:** use NPM_TOKEN_IN_VAULT for publishing ([967b795](https://github.com/linagora/twake-ui/commit/967b7956d3e13d3ba744ea674606646ccf7e85e3))


### Features

* makePalette now has palette as an argument and is exported into the lib ([5a9850f](https://github.com/linagora/twake-ui/commit/5a9850f21dd9befec6a20d652ee306478c943a20))


### BREAKING CHANGES

* updated to mui v9

## [1.6.1](https://github.com/linagora/twake-ui/compare/v1.6.0...v1.6.1) (2026-05-06)


### Bug Fixes

* trigger release ([be0544c](https://github.com/linagora/twake-ui/commit/be0544c8603365348ea02b9c5af59ce4254f7fc1))

# [1.6.0](https://github.com/linagora/twake-ui/compare/v1.5.0...v1.6.0) (2026-04-22)


### Bug Fixes

* ESM/CJS mismatch in exports ([bd31d2d](https://github.com/linagora/twake-ui/commit/bd31d2db3b8993da5cafe582cb350441a7d05685))


### Features

* Add all storybook/argos config files ([6a774a9](https://github.com/linagora/twake-ui/commit/6a774a97cedfacaa8387f3b4d5b75503efd7ae65))
* Add packages for storybook and argos ([729e937](https://github.com/linagora/twake-ui/commit/729e93734f0e09d639871410f0256cbba0939ad9))
* Add storybook stories ([9a141ca](https://github.com/linagora/twake-ui/commit/9a141ca06d2c5cfd9ec8a8142a5c5a34452cfd90))

# [1.5.0](https://github.com/linagora/twake-ui/compare/v1.4.0...v1.5.0) (2026-04-14)


### Features

* Add swipeable override :sparkles: ([15af929](https://github.com/linagora/twake-ui/commit/15af92994a086ea49a7a0957cfeb6c3a09d0e96b))

# [1.4.0](https://github.com/linagora/twake-ui/compare/v1.3.0...v1.4.0) (2026-04-09)


### Features

* **twake-mui:** Now expose .d.ts ([945d3b2](https://github.com/linagora/twake-ui/commit/945d3b2e1616f9be237f1416630aef7014331226))

# [1.3.0](https://github.com/linagora/twake-ui/compare/v1.2.0...v1.3.0) (2026-04-09)


### Features

* **twake-mui:** Update datePicker and textField overrides ([9a0013e](https://github.com/linagora/twake-ui/commit/9a0013e22184f6f480ccbf06ec205c582492a410))

# [1.2.0](https://github.com/linagora/twake-ui/compare/v1.1.0...v1.2.0) (2026-04-09)


### Bug Fixes

* remove :has() selector for jsdom compatibility in tests ([252889d](https://github.com/linagora/twake-ui/commit/252889d6499fa3ad76cfa7de8d05e88a5fe9197f))


### Features

* add component overrides for DatePicker, Accordion, Checkbox, IconButton ([c5e18a1](https://github.com/linagora/twake-ui/commit/c5e18a1faba4f8a65c7eaa56d5c3f0581be8aa59))
* **twake-mui:** add Avatar component with gradient background support ([d3ad072](https://github.com/linagora/twake-ui/commit/d3ad072f78d94068a4675adb8493b630e9d7add2))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.7]

### Changed

- DatePicker: MuiYearCalendar-root width set to 245px
- DatePicker: MuiYearCalendar-button and MuiMonthCalendar-button use theme primary (orange) for selected/hover/focus instead of default blue
- DatePicker: MuiYearCalendar-button base styles aligned with MuiMonthCalendar-button (fontSize, lineHeight, height, width, transparent tabindex="0")

## [1.1.6]

### Changed

- DatePicker/DateCalendar: documented triple-class selector for MUI X specificity; no API change

## [1.1.5]

### Changed

- Updated DatePicker selected day background color to use theme primary color (orange) instead of default blue
- Added override for MuiButtonBase-root.MuiPickersDay-root.Mui-selected to ensure proper styling

## [1.1.4]

### Added

- Global styles for DatePicker components
- Custom styling for DateCalendar header and controls
- Improved typography and spacing for calendar components

## [1.1.3]

### Changed

- Updated CHANGELOG documentation

## [1.1.2]

### Changed

- Updated Button component padding for medium size (from 8px to 9px, contained from 9px to 10px)
- Updated ToggleButton component with medium size padding (9px 24px)
- Improved type safety for palette grey configuration
- Refactored component overrides to remove unnecessary theme parameter dependencies

### Fixed

- Updated TypeScript configuration to enable package building for local development usage
- Added declaration file generation and output directory configuration

## [1.1.1]

### Added

- Avatar component with gradient background support
- Avatar helpers: nameToColor, supportedColors, colorMapping
- Avatar overrides with custom size classes (xs, s, m, l, xl)
- Export nameToColor and supportedColors from package index

### Changed

- Avatar component now supports gradient backgrounds with 11 predefined colors
- Avatar size system updated with new dimensions and typography

## [1.0.0] 

### Added

- Initial release
- Palette system with techno-independent color definitions
- Typography system with custom variants
- Button component overrides (contained, outlined, text)
- TextField component overrides
- Dialog/Modal component overrides
- ThemeProvider wrapper component
- TypeScript type definitions
