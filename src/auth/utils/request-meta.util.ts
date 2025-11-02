import { Request } from 'express'

export interface RequestMetadata {
  userAgent?: string
  ipAddress?: string
}

/**
 * Extract metadata from Express request
 * @param request - Express request object
 * @returns RequestMetadata - Object containing user agent and IP address
 */
export const extractRequestMetadata = (request: Request): RequestMetadata => {
  return {
    userAgent: request.headers['user-agent'],
    ipAddress: request.ip,
  }
}

/**
 * Get user agent from request
 * @param request - Express request object
 * @returns string | undefined - User agent string
 */
export const getUserAgent = (request: Request): string | undefined => {
  return request.headers['user-agent']
}

/**
 * Get IP address from request
 * @param request - Express request object
 * @returns string | undefined - IP address
 */
export const getIpAddress = (request: Request): string | undefined => {
  return request.ip
}
