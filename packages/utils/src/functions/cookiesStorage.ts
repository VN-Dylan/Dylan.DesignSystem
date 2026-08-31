/**
 * A `localStorage`-shaped wrapper over `document.cookie`. No-ops safely when
 * `document` is unavailable (SSR / tests).
 */
export const cookiesStorage = {
  getItem(name: string): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
    )
    return match ? decodeURIComponent(match[1]!) : null
  },

  setItem(name: string, value: string, expires?: number | Date): void {
    if (typeof document === 'undefined') return
    let expiry = ''
    if (typeof expires === 'number') {
      const d = new Date()
      d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000)
      expiry = `; expires=${d.toUTCString()}`
    } else if (expires instanceof Date) {
      expiry = `; expires=${expires.toUTCString()}`
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expiry}; path=/`
  },

  removeItem(name: string): void {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  },
}

export default cookiesStorage
