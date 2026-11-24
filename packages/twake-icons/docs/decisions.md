# Decisions

Decisions taken on @linagora/twake-icons, oldest first. Append only: a decision that changes gets a new entry that replaces the old one and cites it. Entry format: the `twake-decisions` skill of [linagora/twake-guidelines](https://github.com/linagora/twake-guidelines/blob/main/skills/twake-decisions/SKILL.md).

Categories: UX, UI, Product, Architecture, Infra, Tech.

## 2026-11-24, [UX] An icon is decorative unless it has a label

- Decision: an `Icon` without `aria-label`, `aria-labelledby` or `title` is decorative and hidden from assistive technologies (`aria-hidden="true"` and `focusable="false"` on an SVG, `alt=""` on a PNG); a labelled one is an image named by its label (`role="img"`, a `title` alone becoming its `aria-label`). An `aria-hidden`, `role` or `alt` passed by the caller wins.
- Decided by: Crash-- (CTO), [#269](https://github.com/linagora/twake-ui/pull/269)
- Why: most icons sit next to a text, or in a button that already has a name, and read out they only add noise; an icon that carries meaning on its own says so with a label.
- Scope: `Icon`, SVG and PNG icons (an icon element passed as is is unchanged).
