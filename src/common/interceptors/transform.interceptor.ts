import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiResponse } from '../dto/api-response.dto'

/**
 * Transform Interceptor to standardize all API responses
 *
 * This interceptor automatically wraps all responses in the format:
 * {
 *   status_code: number,
 *   data: any,
 *   message: string
 * }
 *
 * If the response is already in this format, it will be returned as-is.
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()

    return next.handle().pipe(
      map((data) => {
        // If response is already in API format, return as-is
        if (
          data &&
          typeof data === 'object' &&
          'status_code' in data &&
          'data' in data &&
          'message' in data
        ) {
          return data as ApiResponse<T>
        }

        // Otherwise, wrap the response
        return {
          status_code: response.statusCode || HttpStatus.OK,
          data: data || null,
          message: '',
        }
      }),
    )
  }
}
