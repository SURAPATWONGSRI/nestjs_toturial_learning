import { HttpStatus } from '@nestjs/common'

/**
 * Standard API Response format
 */
export interface ApiResponse<T = any> {
  status_code: number
  data: T
  message: string
}

/**
 * Create a success response
 */
export const createSuccessResponse = <T>(
  data: T,
  message = '',
  statusCode = HttpStatus.OK,
): ApiResponse<T> => {
  return {
    status_code: statusCode,
    data,
    message,
  }
}

/**
 * Create an error response
 */
export const createErrorResponse = (
  message: string,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  data: any = null,
): ApiResponse => {
  return {
    status_code: statusCode,
    data,
    message,
  }
}
