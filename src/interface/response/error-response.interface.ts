interface ErrorMessage {
  message: string;
}

// Extending default error with additional field message

export interface IError extends Error {
  error: ErrorMessage;
}
