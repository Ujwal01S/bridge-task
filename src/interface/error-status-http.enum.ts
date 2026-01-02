export const HTTP_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpCode = (typeof HTTP_CODE)[keyof typeof HTTP_CODE];
