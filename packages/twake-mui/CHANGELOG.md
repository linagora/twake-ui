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
