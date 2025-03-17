import $api from "@/shared/http/api"
import { executeWithErrorProcessing } from "@/shared/http/executeWithErrorProcessing"
import { Form, FormDetails, FormWithoutContent } from "./types"
import { AxiosRequestConfig } from "axios"

const getForms = async (signal?: AbortSignal) => {
  const { data } = await $api.get<FormWithoutContent[]>("/forms", { signal })
  return data
}

const getForm = async (id: string, config: AxiosRequestConfig) => {
  const { data } = await $api.get<Form>(`/forms/${id}`, {
    signal: config.signal,
  })
  return data
}

const getFormByUrl = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await $api.get<Form>(`/forms/url/${url}`, {
    signal: config.signal,
  })
  return data
}

const getFormDetails = async (id: string, signal: AbortSignal) => {
  const { data } = await $api.get<FormDetails>(`/forms/details/${id}`, { signal })
  return data
}

/** ==================================== */

const createForm = async (title: string, description: string) => {
  const result = await executeWithErrorProcessing(() =>
    $api.post<FormWithoutContent>("/forms", { title, description })
  )
  return result
}

const saveForm = async (id: string, content: string) => {
  const { data } = await $api.put<Form>(`/forms/${id}`, { content })
  return data
}

const publishForm = async (id: string) => {
  const { data } = await $api.post<true>(`/forms/publish/${id}`)
  return data
}

const submitForm = async (url: string, content: string) => {
  const { data } = await $api.post<true>(`/forms/submit/${url}`, { content })
  return data
}

export const formsApi = {
  getForms,
  getForm,
  getFormByUrl,
  getFormDetails,

  createForm,
  saveForm,
  publishForm,
  submitForm
}
