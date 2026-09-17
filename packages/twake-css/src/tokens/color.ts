// Local stand-ins for MUI's `alpha` and `deepmerge`, so this module carries no
// runtime dependency: an app installing the package for a stylesheet must not
// pull MUI along. `alpha` keeps MUI's output format, `rgba(r, g, b, a)`, since
// the values end up in the same stylesheet MUI emits at runtime.

export const alpha = (hex: string, opacity: number): string => {
  const digits = hex.replace('#', '')
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map(d => d + d)
          .join('')
      : digits
  const [r, g, b] = [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16))

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const deepmerge = <T extends object>(target: T, source: Partial<T>): T => {
  const out: Record<string, unknown> = { ...target }

  for (const [key, value] of Object.entries(source)) {
    const current = out[key]
    out[key] =
      isPlainObject(current) && isPlainObject(value)
        ? deepmerge(current, value)
        : value
  }

  return out as T
}
