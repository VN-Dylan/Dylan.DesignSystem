/**
 * Resolve after `ms` milliseconds. Useful for demos, retry backoff and tests.
 *
 * @example await sleep(200)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default sleep
