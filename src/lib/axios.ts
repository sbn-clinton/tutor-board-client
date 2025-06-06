import axios from "axios"

// Create a base axios instance with default config
const api = axios.create({
  baseURL: ` ${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or wherever you store it
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        const response = await axios.post("http://localhost:5000/api/auth/refresh-token", {
          refreshToken,
        })

        const { token } = response.data

        // Update the token in localStorage
        localStorage.setItem("token", token)

        // Update the Authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`

        // Retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          window.location.href = "/auth/login"
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
