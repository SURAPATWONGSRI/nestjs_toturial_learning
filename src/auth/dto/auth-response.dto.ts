/**
 * Response for successful authentication
 * Note: refresh_token is sent both in response body AND HttpOnly cookie
 */
export interface AuthResponseData {
  user: {
    id: string
    email: string
    displayName?: string
  }
  access_token: string
  refresh_token: string
  refresh_token_id: string
}

/**
 * Response for token refresh
 * Note: New refresh_token is sent both in response body AND HttpOnly cookie
 */
export interface RefreshResponseData {
  access_token: string
  refresh_token: string
  refresh_token_id: string
}

/**
 * Response for logout
 */
export interface LogoutResponseData {
  ok: boolean
}
