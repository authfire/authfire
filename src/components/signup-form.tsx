"use client"

import { clearInput, cn, getInputValue } from "../lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { LoadingIcon } from "./loading-icon"
import { createUserWithEmailAndPassword, sendEmailVerification, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"
import GoogleSignInButton from "./google-signin-button"
import OpenIDConnectButton from "./openid-connect-button"

export function SignupForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisabled(true)

    const email = getInputValue("email")
    const password = getInputValue("password")

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        clearInput("email")
        clearInput("password")
        const user = userCredential.user;
        setUser(user)

        // Send email verification
        sendEmailVerification(user)
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode + ' ' + errorMessage, {
              duration: Infinity,
            });
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode + ' ' + errorMessage, {
          duration: Infinity,
        });
      })
      .finally(() => {
        setIsDisabled(false);
      })
  }

  if (user) {
    return (
      <div className={cn("grid gap-6", className)} {...props}>
        <p className="text-center text-sm text-green-700 dark:text-green-400">
          Your account created successfully! Please check your email at <span className="font-semibold">{user.email}</span> to verify your account.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={createAccount}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required={true}
              disabled={isDisabled}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required={true}
              disabled={isDisabled}
            />
          </div>
          <Button disabled={isDisabled}>
            <LoadingIcon aria-disabled={isDisabled} />
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
      <OpenIDConnectButton />
    </div>
  )
}
