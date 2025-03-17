// import $api from "@/app/http/api"
// import {User} from "@/app/types/models";

import $api from "@/shared/http/api";
import {executeWithErrorProcessing} from "@/shared/http/executeWithErrorProcessing";
import {User} from "@/entities/user/types";

const signIn = async (email: string, password: string) => {
	const result = await executeWithErrorProcessing(() =>
		$api.post<User>("/auth/signin", { email, password })
	)
	return result
}

const signUp = async (email: string, password: string) => {
	const result = await executeWithErrorProcessing(() =>
		$api.post<User>("/auth/signup", { email, password })
	)
	return result
}

const signOut = async () => {
	const result = await $api.post("/auth/signout")
	return result
}

const refresh = async () => {
	const { data } = await $api.post<User>("/auth/refresh")
	return data
}

const validateEmail = async (email: string) => {
	const result = await executeWithErrorProcessing(() =>
		$api.post("/auth/validate-email", { email })
	)
	return result
}

export const userApi = {
	signIn,
	signUp,
	signOut,
	refresh,
	validateEmail
}