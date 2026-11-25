# Decisions

Decisions taken on @linagora/twake-mui, oldest first. Append only: a decision that changes gets a new entry that replaces the old one and cites it. Entry format: the `twake-decisions` skill of [linagora/twake-guidelines](https://github.com/linagora/twake-guidelines/blob/main/skills/twake-decisions/SKILL.md).

Categories: UX, UI, Product, Architecture, Infra, Tech.

## 2026-11-23, [UI] The chosen tab of a segmented control is in the primary colour

- Decision: in `Tabs` `segmented`, the chosen tab takes the colour of a chosen standard or `narrowed` tab (`primary.main`) on its raised pill, instead of `text.primary`; a disabled chosen tab greys like the other disabled tabs.
- Decided by: Crash-- (CTO), 2026-11-23, from the vacation choice of Twake Mail ([Crash--/twake-mail-frontend#1123](https://github.com/Crash--/twake-mail-frontend/pull/1123)), whose Figma marks the choice in blue.
- Why: the segmented control was the only tab look that did not show the choice in the primary colour.
- Scope: `Tabs`.

## 2026-11-25, [UI] A rounded Avatar has the 12 px corner of the icon tiles

- Decision: an `Avatar` with `variant="rounded"` takes the `lg` radius of the scale (12 px) from the `m` size up, the corner of the icon tiles of the Teammail 1.1 Figma; the `xs` (16 px) and `s` (24 px) sizes keep the 6 px of `theme.shape`, as a 12 px corner would round them into a circle. The rule holds for the named sizes; a numeric size takes 12 px, and an app that goes under 32 px sets its own radius.
- Decided by: Crash-- (CTO), 2026-11-25, from the review of Swann Maillard (design) in [Crash--/twake-mail-frontend#1170](https://github.com/Crash--/twake-mail-frontend/issues/1170)
- Why: the tiles of the settings icons had the 6 px of `theme.shape`, smaller than any step of the radius scale and rounder in the Figma.
- Scope: `Avatar`.
