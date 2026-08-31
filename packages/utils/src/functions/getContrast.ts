/**
 * Classify a colour as `'light'` or `'dark'` by perceived brightness
 * (W3C / YIQ formula). Accepts `#rgb`, `#rrggbb` and `rgb(r, g, b)`.
 *
 * @example getContrast('#ffffff') // 'light'
 * @example getContrast('rgb(0, 0, 0)') // 'dark'
 */
export function getContrast(color: string): 'light' | 'dark' {
  let r = 0
  let g = 0
  let b = 0

  const hex = color.trim().replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    r = parseInt(hex[0]! + hex[0]!, 16)
    g = parseInt(hex[1]! + hex[1]!, 16)
    b = parseInt(hex[2]! + hex[2]!, 16)
  } else if (/^[0-9a-f]{6}$/i.test(hex)) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else {
    const m = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if (m) {
      r = Number(m[1])
      g = Number(m[2])
      b = Number(m[3])
    }
  }

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'light' : 'dark'
}

export default getContrast
