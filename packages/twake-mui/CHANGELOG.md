# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
