export function getErrorOnly(err: unknown, message?: string): Error {
  return err instanceof Error ? err : new Error(message ?? `Unknown Error`)
}
