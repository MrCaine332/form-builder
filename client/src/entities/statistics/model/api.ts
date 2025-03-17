import $api from "@/shared/http/api"
import { Statistics } from "./types"

const getStatistics = async (signal?: AbortSignal) => {
  const { data } = await $api.get<Statistics>("/forms/statistics", { signal })
  return data
}

export const statisticsApi = {
  getStatistics,
}
