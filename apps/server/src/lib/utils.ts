export function getErrorMessage(
  error: unknown,
  defaultErrorMessage = 'Something went wrong. Please try again later.',
): string {
  let errorMessage = defaultErrorMessage
  if (error instanceof Error) {
    errorMessage = error.message
  }

  return errorMessage
}
