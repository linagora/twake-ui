/**
 * Reads a color typed by a person: `#RRGGBB`, `RRGGBB`, `#RGB` or `RGB`, in any
 * case, spaces around. Returns `#RRGGBB` in capitals, as in `COLORS`, or null
 * when it is not a color.
 */
export const normalizeHexColor = (text: string): string | null => {
  const digits = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text.trim())?.[1]
  if (digits === undefined) return null
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map(digit => digit + digit)
          .join('')
      : digits
  return `#${full.toUpperCase()}`
}

export const COLORS = [
  '#273891',
  '#7E57E3',
  '#9E83E8',
  '#91CEF6',
  '#2D83FF', // file-folder color, don't remove it
  '#006BD8',
  '#038199',
  '#51B588',
  '#457D6C',
  '#1EBBCC',
  '#E0465C',
  '#ED20A4',
  '#ED768D',
  '#B85B17',
  '#EDA91D',
  '#BA8144',
  '#ED916B',
  '#EDC661',
  '#131326',
  '#646580'
]
