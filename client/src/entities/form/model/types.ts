import { Statistics } from "@/entities/statistics/model"

export type Form = {
  id: number
  userId: number

  title: string
  description: string
  content: string

  isPublished: boolean
  shareURL: string
  visits: number
  submissions: number

  createdAt: string
}

export type FormWithoutContent = Omit<Form, "content">

export type FormPublic = {
  shareURL: string
  title: string
  description: string
  content: string
}

export type Submission = {
  content: string
  createdAt: string
}

export type FormDetails = {
  form: Form
  statistics: Statistics
  submissions: Submission[]
}
