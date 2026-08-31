// Ambient declarations for untyped third-party modules.

declare module 'jsvectormap' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsVectorMap: any
  export default jsVectorMap
}

declare module 'jsvectormap/dist/maps/*' {
  const map: unknown
  export default map
}
