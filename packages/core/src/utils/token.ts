const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * Get access token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Set access token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Remove access token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * Set refresh token
 */
export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

/**
 * Remove refresh token
 */
export function removeRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/**
 * Clear all tokens
 */
export function clearTokens(): void {
  removeToken()
  removeRefreshToken()
}