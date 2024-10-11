export function getErrorOnly(err: unknown): Error {
  return err instanceof Error ? err : new Error(`Unknown Error`)
}
