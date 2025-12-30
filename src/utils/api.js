/**
 * Get the API base URL based on environment
 *
 * In development (with Vite proxy):
 *   - Returns empty string, so '/api/endpoint' uses the proxy
 *   - Proxy forwards to backend with /api/ preserved
 *
 * In production (without Vite proxy):
 *   - Returns the full backend URL from VITE_BACKEND_URL
 *   - Direct calls to 'http://backend.com/api/endpoint'
 */
export const getApiBaseUrl = () => {
  // Check if we're in development mode and should use the proxy
  const isDevelopment = import.meta.env.DEV

  if (isDevelopment) {
    // Use relative URLs - Vite proxy will handle them
    return ''
  } else {
    // Use full backend URL from environment variable
    return import.meta.env.VITE_BACKEND_URL || 'http://0.0.0.0:3003'
  }
}

/**
 * Build full API URL
 * @param {string} path - API path (e.g., '/api/login')
 * @returns {string} - Full URL or relative path
 */
export const buildApiUrl = (path) => {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}${path}`
}
