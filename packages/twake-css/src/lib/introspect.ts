export interface Rule {
  selector: string
  decls: [string, string][]
  media?: string
}

const BREAKPOINT_SUFFIX = /-(t|s|m)$/

const SIDES = ['top', 'right', 'bottom', 'left']

// The browser expands `margin: 1rem` into four longhands. Fold it back so the
// reference shows what the author writes.
const collapse = (decls: [string, string][]): [string, string][] => {
  let folded = decls

  for (const shorthand of ['margin', 'padding']) {
    const longhands = SIDES.map(side => `${shorthand}-${side}`)
    const values = longhands.map(
      prop => folded.find(([name]) => name === prop)?.[1]
    )

    if (values.every(value => value !== undefined && value === values[0])) {
      folded = [
        ...folded.filter(([name]) => !longhands.includes(name)),
        [shorthand, values[0] as string]
      ]
    }
  }

  return folded
}

// Reads the utility classes back out of the stylesheet the page loaded.
export const collectRules = (): Rule[] => {
  const rules: Rule[] = []

  const walk = (list: CSSRuleList, media?: string): void => {
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSMediaRule) {
        walk(rule.cssRules, rule.conditionText)
      } else if (rule instanceof CSSStyleRule) {
        const style = rule.style
        const decls = Array.from(style).map(
          prop =>
            [
              prop,
              style.getPropertyValue(prop) +
                (style.getPropertyPriority(prop) ? ' !important' : '')
            ] as [string, string]
        )
        if (decls.length > 0) {
          rules.push({ selector: rule.selectorText, decls: collapse(decls), media })
        }
      }
    }
  }

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules)
    } catch {
      // A stylesheet we are not allowed to read is never one of ours.
    }
  }

  return rules
}

export const isResponsiveVariant = (selector: string): boolean =>
  BREAKPOINT_SUFFIX.test(selector)

export const cssVariablesUsed = (rules: Rule[]): string[] => {
  const found = new Set<string>()

  for (const rule of rules) {
    for (const [, value] of rule.decls) {
      for (const match of value.matchAll(/var\((--[\w-]+)/g)) found.add(match[1])
    }
  }

  return Array.from(found).sort()
}


// Every custom property twake-mui declares, not just the ones the utilities
// consume: an app can use any of them in its own CSS.
export const declaredVariables = (prefix: string): string[] => {
  const found = new Set<string>()

  const walk = (list: CSSRuleList): void => {
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSMediaRule) {
        walk(rule.cssRules)
      } else if (rule instanceof CSSStyleRule) {
        for (const prop of Array.from(rule.style)) {
          if (prop.startsWith(prefix)) found.add(prop)
        }
      }
    }
  }

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules)
    } catch {
      // A stylesheet we are not allowed to read is never one of ours.
    }
  }

  return Array.from(found).sort()
}
