import axios, {AxiosError, CanceledError, InternalAxiosRequestConfig} from "axios"

export const API_URL = `http://localhost:5000`

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error instanceof CanceledError) throw error
    if (originalRequest.url.includes("refresh")) throw error

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await $api.post(`${API_URL}/auth/refresh`)
        return $api.request(originalRequest)
      } catch (e) {
        console.log(e)
      }
    }

    throw error
  }
)

export default $api
