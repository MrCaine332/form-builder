import { createEvent, createStore, sample } from "effector"
import { createEffect } from "effector/compat"
import { User } from "./types"
import { userApi } from "./api"

type AuthStore = {
  isAuthenticated: boolean
  user: User | null
  status: "INITIAL" | "READY"
}

/** Stores */
/** =================================== */
export const $authStore = createStore<AuthStore>({
  isAuthenticated: false,
  user: null,
  status: "INITIAL",
})

export const $isAuthenticated = $authStore.map((state) => state.isAuthenticated)

/** Events */
/** =================================== */
export const signIn = createEvent<User>()
export const signOut = createEvent()

export const refresh = createEvent()
export const setStatusReady = createEvent()

/** Effects */
/** =================================== */
export const refreshFx = createEffect(async () => {
  const data = await userApi.refresh()
  return data
})

sample({
  clock: refresh,
  target: refreshFx,
})

sample({
  clock: refreshFx.doneData,
  target: signIn,
})

sample({
  clock: refreshFx.finally,
  target: setStatusReady,
})

export const signOutFx = createEffect(async () => {
  await userApi.signOut()
})

sample({
  clock: signOut,
  target: signOutFx,
})



/** Subscriptions */
/** =================================== */
$authStore.on(signIn, (state, data) => ({
  ...state,
  user: data,
  isAuthenticated: true,
}))

$authStore.on(signOutFx.done, (state) => ({
  ...state,
  user: null,
  isAuthenticated: false,
}))

$authStore.on(setStatusReady, (state) => ({ ...state, status: "READY" }))
