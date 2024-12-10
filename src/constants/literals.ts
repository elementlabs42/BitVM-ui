const ERROR_LITERALS: Record<string, string> = {
  InvalidAmount: 'Peg out amount is not power of 2',
  PegOutInProgress: 'Peg out is in progress for current address',
  UtxoNotAvailable: 'The source outpoint has already been spent',
}

export function getErrorLiteral(errorName: string) {
  return ERROR_LITERALS[errorName] ?? errorName
}
