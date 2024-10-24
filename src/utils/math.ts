// https://github.com/nodef/extra-bigint

/**
 * Check if bigint is a power-of-2.
 * @param x a bigint
 * @returns 2ⁱ = x? | i = +ve integer
 */
export function isPow2(x: bigint): boolean {
  return /^10*$/.test(x.toString(2))
}

/**
 * Find largest power-of-2 less than or equal to given bigint.
 * @param x a bigint
 * @returns 2ⁱ | 2ⁱ ≤ x and 2ⁱ > x/2
 */
export function prevPow2(x: bigint): bigint {
  if (x <= 1n) return 0n
  const n = x.toString(2).length
  return BigInt('0b1' + '0'.repeat(n - 1))
}
