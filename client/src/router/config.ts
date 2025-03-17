export const ROUTES = {
	root: "",
	submit: "/submit/:url",

	/** Authenticated routes */
	dashboard: "/dashboard",
	builder: "/builder/:id",
	form: "/form/:id",

	/** Not authenticated routes */
	signIn: "/signin",
	signUp: "/signup",
} as const