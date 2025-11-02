import { UnauthorizedException } from '@nestjs/common'

/**
 * Thrown when refresh token has expired
 */
export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor() {
    super('Refresh token has expired')
  }
}

/**
 * Thrown when refresh token has been revoked
 */
export class RefreshTokenRevokedException extends UnauthorizedException {
  constructor() {
    super('Refresh token has been revoked')
  }
}

/**
 * Thrown when refresh token is not found in database
 */
export class RefreshTokenNotFoundException extends UnauthorizedException {
  constructor() {
    super('Refresh token not found')
  }
}

/**
 * Thrown when refresh token reuse is detected
 */
export class RefreshTokenReusedException extends UnauthorizedException {
  constructor() {
    super('Refresh token reuse detected - all tokens revoked for security')
  }
}

/**
 * Thrown when token verification fails
 */
export class InvalidTokenException extends UnauthorizedException {
  constructor(message = 'Invalid or malformed token') {
    super(message)
  }
}

/**
 * Thrown when user credentials are invalid
 */
export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid email or password')
  }
}
