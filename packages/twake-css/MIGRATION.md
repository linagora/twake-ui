# Migrating from cozy-ui

## Variables

cozy-ui named its variables by hand (`--primaryColor`); the twake ones follow
the palette structure, so every value has one and none can go missing.

| cozy-ui | twake-css |
| --- | --- |
| `--primaryColor` / `--primaryColorLight` / `--primaryColorDark` | `--twake-palette-primary-{main,light,dark}` |
| `--primaryContrastTextColor` | `--twake-palette-primary-contrastText` |
| `--primaryTextColor` / `--secondaryTextColor` | `--twake-palette-text-{primary,secondary}` |
| `--errorColor` / `--successColor` / `--warningColor` / `--infoColor` | `--twake-palette-{error,success,warning,info}-main` |
| `--black` / `--white` | `--twake-palette-common-{black,white}` |
| `--dividerColor` | `--twake-palette-divider` |
| `--actionColorActive` / `Hover` / `Selected` / `Disabled` / `DisabledBackground` / `Focus` | `--twake-palette-action-{active,hover,selected,disabled,disabledBackground,focus}`, same formulas, both modes |
| `--actionColorGhost` / `--actionColorHoverGhost` | removed, no consumer |

## Removed classes

31 classes are gone. The ten non-semantic colors were paint names with no role
and no per-mode variant; `errorBackground` and `primaryBackgroundLight` only
served deprecated cozy-ui components; the typography ramp conflicted with
twake-mui's own (`.u-title-h1` 24px vs `Typography h1` 45px).

| Removed | Replacement |
| --- | --- |
| `.u-charcoalGrey` `.u-coolGrey` `.u-silver` `.u-slateGrey` `.u-paleGrey` `.u-lightishPurple` `.u-dodgerBlue` `.u-monza` `.u-pomegranate` `.u-weirdGreen` (and their `.u-bg-*`) | a semantic class, or local CSS |
| `.u-errorBackground` `.u-bg-errorBackground` `.u-primaryBackgroundLight` `.u-bg-primaryBackgroundLight` | local CSS |
| `.u-title-h1` `.u-title-h2` `.u-title-h3` `.u-title-h4` `.u-text` `.u-caption` `.u-subtitle` | `<Typography>` |

Added: `.u-secondaryColor`, `.u-secondaryColorLight`, `.u-secondaryContrastTextColor`
and their `.u-bg-*`, and `.u-elevation-0` to `-25` following the shadow ramp.

## `--zIndex-*` are deprecated

Still emitted so existing code keeps working, but rebased onto MUI's 1000-1500
ramp instead of cozy-ui's -1 to 80, since twake-mui does not pull MUI down the
way cozy-ui did. Relative arithmetic such as `calc(var(--zIndex-modal) + 30)` keeps
working, against the right baseline.

| Deprecated | Use instead |
| --- | --- |
| `--zIndex-nav` | `var(--twake-zIndex-appBar)` |
| `--zIndex-drawer` | `var(--twake-zIndex-drawer)` |
| `--zIndex-modal`, `--zIndex-popover` | `var(--twake-zIndex-modal)` |
| `--zIndex-alert` | `var(--twake-zIndex-snackbar)` |
| `--zIndex-below`, `-app`, `-low`, `-alertMobile`, `-bar`, `-selection`, `-overlay`, `-modal-footer`, `-modal-toolbar` | a local value, on the 1000-1500 scale |

`--zIndex-fileActionMenu` is removed, it had no consumer.

## Spacing: `.u-p-1` is not `sx={{ p: 1 }}`

Both sit on the same 8px grid, counted with a different step: the utilities
count in rem, MUI in half-rem.

| Class | Value | MUI |
| --- | --- | --- |
| `.u-p-half` | 8px | `spacing(1)` |
| `.u-p-1` | 16px | `spacing(2)` |
| `.u-p-1-half` | 24px | `spacing(3)` |
| `.u-p-2` | 32px | `spacing(4)` |
| `.u-p-3` | 48px | `spacing(6)` |
