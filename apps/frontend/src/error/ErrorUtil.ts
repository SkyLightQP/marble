interface ErrorWithMessage {
  readonly message: string;
}

interface CustomError {
  readonly code: Uppercase<string>;
  readonly message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage | Error {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getCustomError(error: unknown): CustomError {
  return JSON.parse(toErrorWithMessage(error).message) as CustomError;
}
