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

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i

/** `#RRGGBB` in capitals for a 3 or 6 digit hexadecimal color, else null */
export const toHex = (text: string): string | null => {
  const digits = HEX.exec(text.trim())?.[1]
  if (digits === undefined) return null
  const full =
    digits.length === 3 ? digits.replace(/./g, digit => digit + digit) : digits
  return `#${full.toUpperCase()}`
}
