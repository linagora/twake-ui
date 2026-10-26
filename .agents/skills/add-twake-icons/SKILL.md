---
name: add-twake-icons
description: Use when adding one or more new SVG icons or illustrations to the @linagora/twake-icons package of twake-ui, or when the user runs /add-twake-icons <svg files or Figma links>. Points to the package README procedure and covers the single commit, branch and PR.
license: MIT
---

# Add icons to twake-icons

One or more icons = one branch = one commit = one PR.

1. Check that each icon is not already in `packages/twake-icons/assets/` and is used by more
   than one app (an icon for a single app stays in that app).
2. Branch from an up-to-date `main`: `feat/twake-icons-<short-description>`.
3. Follow **How to add an icon** in
   [packages/twake-icons/README.md](../../../packages/twake-icons/README.md), for the new
   icons only.
4. Commit everything together with the scope `twake-icons`
   (`feat(twake-icons): Add Inbox and ReplyAll icons`), push, and open the PR with a
   lowercase title and a `## Summary` body listing the new exports.
