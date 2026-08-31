import {
  autoUpdate,
  flip,
  offset,
  shift,
  type Middleware,
  type UseFloatingOptions,
} from '@floating-ui/react'

const isJSDOM = () =>
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('jsdom')

export const getFloatingMiddleware = (gap: number): Middleware[] =>
  isJSDOM() ? [] : [offset(gap), flip(), shift({ padding: 8 })]

export const floatingAutoUpdate: UseFloatingOptions['whileElementsMounted'] = (
  reference,
  floating,
  update,
) => {
  if (isJSDOM()) return () => {}
  return autoUpdate(reference, floating, update)
}
