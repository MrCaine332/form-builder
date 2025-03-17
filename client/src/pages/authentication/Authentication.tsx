import { RouteObject, useNavigate } from "react-router-dom"
import { ROUTES } from "@/router"
import { API_URL } from "@/shared/http/api"
import { Section } from "@/shared/ui/section"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
import {
  AuthenticationSignIn,
  AuthenticationSignUp,
} from "@/modules/authentication"
import GoogleIcon from "@/shared/assets/icons/google-icon.svg"

type AuthenticationProps = {
  formType: "signin" | "signup"
}

export const Authentication = ({
  formType = "signin",
}: AuthenticationProps) => {
  const navigate = useNavigate()

  const toggleForm = () => {
    navigate(formType === "signin" ? ROUTES.signUp : ROUTES.signIn)
  }

  const onGoogleAuth = () => {
    window.open(API_URL + "/auth/google", "_self")
  }

  return (
    <div className="flex w-full flex-grow h-full items-center justify-center">
      <Section className="bg-card-background p-8 w-96 my-2 flex flex-col gap-8 border border-border">
        <div>
          <h1 className="font-bold text-xl">
            {formType === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <h2 className="">To continue with FormBuilder</h2>
        </div>
        <Button
          variant="outline"
          className="justify-start gap-2"
          onClick={onGoogleAuth}
        >
          <img className="h-4" src={GoogleIcon} alt="" />
          Continue with Google
        </Button>

        <div className="flex gap-4 items-center">
          <Separator className="shrink" />
          <span className="text-border">or</span>
          <Separator className="shrink" />
        </div>

        {formType === "signin" ? (
          <AuthenticationSignIn />
        ) : (
          <AuthenticationSignUp />
        )}
        <Button variant="link" onClick={toggleForm}>
          {formType === "signin"
            ? "Don't have an account? Sign Up!"
            : "Already have an account? Sign In!"}
        </Button>
      </Section>
    </div>
  )
}

export const signInRoute: RouteObject = {
  path: ROUTES.signIn,
  element: <Authentication formType="signin" />,
}

export const signUpRoute: RouteObject = {
  path: ROUTES.signUp,
  element: <Authentication formType="signup" />,
}
