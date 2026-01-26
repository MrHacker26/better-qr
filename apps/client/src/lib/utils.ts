import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import z from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type WithBasicProps<T = unknown> = T & {
  className?: string
  style?: React.CSSProperties
}

export function getErrorMessage(
  error: unknown,
  defaultMessage = 'Something went wrong. Please try again',
) {
  let errorMessage = defaultMessage
  if (error instanceof z.ZodError) {
    errorMessage = error.issues.length
      ? error.issues.map((e) => e.message).join(', ')
      : error.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  }
  return errorMessage
}
