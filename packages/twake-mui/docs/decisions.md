# Decisions

Decisions taken on @linagora/twake-mui, oldest first. Append only: a decision that changes gets a new entry that replaces the old one and cites it. Entry format: the `twake-decisions` skill of [linagora/twake-guidelines](https://github.com/linagora/twake-guidelines/blob/main/skills/twake-decisions/SKILL.md).

Categories: UX, UI, Product, Architecture, Infra, Tech.

## 2026-11-23, [UI] The chosen tab of a segmented control is in the primary colour

- Decision: in `Tabs` `segmented`, the chosen tab takes the colour of a chosen standard or `narrowed` tab (`primary.main`) on its raised pill, instead of `text.primary`; a disabled chosen tab greys like the other disabled tabs.
- Decided by: Crash-- (CTO), 2026-11-23, from the vacation choice of Twake Mail ([Crash--/twake-mail-frontend#1123](https://github.com/Crash--/twake-mail-frontend/pull/1123)), whose Figma marks the choice in blue.
- Why: the segmented control was the only tab look that did not show the choice in the primary colour.
- Scope: `Tabs`.
