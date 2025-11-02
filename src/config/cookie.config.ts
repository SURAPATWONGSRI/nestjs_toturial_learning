import { CookieOptions } from 'express'

/**
 * Cookie names used in the application
 */
export const COOKIE_NAMES = {
  REFRESH_TOKEN: 'refresh_token',
} as const

/**
 * Get cookie options for refresh token
 * @param isProduction - Whether running in production environment
 * @returns CookieOptions configured for security
 */
export const getRefreshTokenCookieOptions = (
  isProduction = process.env.NODE_ENV === 'production',
): CookieOptions => {
  return {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: isProduction, // HTTPS only in production
    sameSite: 'strict', // CSRF protection
    path: '/auth/refresh', // Only send cookie to refresh endpoint
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  }
}

/**
 * Get cookie options for clearing refresh token
 * @returns CookieOptions configured to clear the cookie
 */
export const getClearRefreshTokenCookieOptions = (): CookieOptions => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/auth/refresh',
    maxAge: 0, // Expire immediately
  }
}

/**
 * CORS configuration
 */
export const getCorsConfig = () => {
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001']

  return {
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
}
