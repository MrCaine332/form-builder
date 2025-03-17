import { AxiosError } from "axios"

export const executeWithErrorProcessing = async <T = any>(
  callback: () => Promise<T>
) => {
  try {
    const result = await callback()
    return { response: result }
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.errors) {
        return { errors: e.response.data.errors }
      }
      if (e.response?.data.message) {
        return { error: e.response.data.message }
      }
    }

    return { error: "Something went wrong. We are sorry." }
  }
}