import axios from 'axios'
import { getToken } from '../utils/token'

/**
 * Dictionary request instance
 * Used for Avue dictionary requests
 */
const dictRequest = axios.create({
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
dictRequest.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers['X-Token'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handles dictionary specific response format
dictRequest.interceptors.response.use(
  (response) => {
    const { data } = response

    // Handle dict response: { code: 200, data: [...] }
    if (data.code === 200 || data.code === 0) {
      return data.data
    }

    return data
  },
  (error) => {
    console.error('Dict request error:', error)
    return Promise.reject(error)
  }
)

export default dictRequest