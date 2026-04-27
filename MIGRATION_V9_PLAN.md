# MUI v7 → v9 Migration Plan

## Summary

Migration from `@mui/material` 7.1.2 to 9.0.0 (jump of 2 major versions).

**Status:** makeLightOverrides.ts refactored (CSS concatenated classes migrated to variants pattern)

---

## Browser Changes (Impact: CRITICAL)

| Browser | v7 | v9 | Impact |
|------------|-----|-----|---------|
| Chrome | 109+ | **117+** | Check target users |
| Firefox | 115+ | **121+** | Check target users |
| Safari | 15.4+ | **17.0+** | Check target users |
| Edge | - | **121+** | Check target users |

**Required Action:** Confirm that target users are using recent versions.

---

## Files to Verify

### 1. `src/lib/makeDarkOverrides.ts` (Impact: MINOR)

No concatenated CSS classes detected.
Verify after migration of makeLightOverrides.ts.

---

### 2. Other Files (Impact: TO VERIFY)

- `src/lib/makeTheme.ts` - Check imports and types
- `src/lib/theme.ts` - Check exports
- `src/components/ThemeProvider/index.tsx` - Check ThemeProvider compatibility
- `src/components/Avatar/index.tsx` - Check `AvatarProps` and styled
- `src/index.ts` - Check all exports

---

## Remaining Migration Steps

### Step 1: Update Dependencies (15 min)
- [ ] Update package.json with v9 packages
  - `@mui/material`: `^9.0.0`
  - `@mui/icons-material`: `^9.0.0`
  - `@mui/system`: `^9.0.0`
- [ ] Install dependencies
- [ ] Verify TypeScript builds without errors

### Step 2: Verify Other Files (30 min)
- [ ] Check makeDarkOverrides.ts for any issues
- [ ] Verify all component exports in index.ts
- [ ] Check ThemeProvider compatibility
- [ ] Review Avatar component for any deprecated APIs

### Step 3: Tests (1-2h)
- [ ] TypeScript Build
- [ ] Linter
- [ ] Storybook build
- [ ] Argos visual tests (if configured)

### Step 4: Validation (30 min)
- [ ] Test in Twake application
- [ ] Verify all custom components
- [ ] Check for any runtime warnings

---

## Identified Risks

| Risk | Probability | Impact | Mitigation |
|--------|-------------|--------|------------|
| Broken styles by variants | Medium | High | Complete visual tests |
| Undetected deprecated props | Medium | Medium | Manual review |
| TypeScript issues | Medium | Medium | Strict build |
| Browser compatibility | High | High | Verify target browser versions |

---

## Points of Attention

1. **CSS specificity order**: The `variants` pattern can change style priority - monitor visual tests
2. **Theme nesting**: Verify that theme overrides still work after v9 upgrade
3. **Custom classes**: Custom classes (e.g., `.size-xs` in Avatar) are not affected by v9
4. **MuiDateCalendar**: Styles in MuiCssBaseline for X components - verify compatibility with v9

---

## Post-Migration Validation

```bash
# Build
npm run build

# Lint
npm run lint

# Storybook
npm run build:doc

# Visual tests (if Argos configured)
npm run screenshots
```

---

## Resources

- [Official v9 migration guide](https://mui.com/material-ui/migration/upgrade-to-v9/)
- [Complete list of breaking changes](https://mui.com/material-ui/migration/upgrade-to-v9/#breaking-changes)
