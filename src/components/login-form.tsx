"use client"

import { cn, getInputValue } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { baseUrl, emailLinkLoginUrl } from "@/lib/const"
import { auth } from "@/lib/firebase"
import { sendSignInLinkToEmail } from "firebase/auth"
import { LoadingIcon } from "./loading-icon"
import { toast } from "sonner"
import GoogleSignInButton from "./google-signin-button"
import OpenIDConnectButton from "./openid-connect-button"
import { signIn } from "@authfire/reactfire"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(true);
  const [message, setMessage] = useState('');

  const sendLoginLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setPasswordRequired(false); // Disable password requirement for email-only login

    const loginForm = document.getElementById("login") as HTMLFormElement;
    loginForm.onsubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      setMessage('');
      setIsDisabled(true);

      const email = getInputValue("email");

      const actionCodeSettings = {
        url: emailLinkLoginUrl,
        handleCodeInApp: true,
      };

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', email);
          setMessage('Login link sent to your email address. Please check your inbox.');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + ' ' + errorMessage);
        })
        .finally(() => {
          setIsDisabled(false);
        });
    }
    loginForm.requestSubmit(); // Submit the form to trigger validation
  }

  const signInWithPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setPasswordRequired(true); // Enable password requirement for email and password login

    const loginForm = document.getElementById("login") as HTMLFormElement;
    loginForm.onsubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      setMessage('');
      setIsDisabled(true);

      const email = getInputValue("email");
      const password = getInputValue("password");

      signIn({ auth, email, password })
        .then(() => {
          toast.success('Login successful!');
          window.location.href = baseUrl;
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-credential') {
            toast.error('Invalid credentials. Please check your email and password.', {
              duration: Infinity,
            });
          } else {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorCode + ' ' + errorMessage);
          }
        })
        .finally(() => {
          setIsDisabled(false);
        });
    }
    loginForm.requestSubmit(); // Submit the form to trigger validation
  }

  if (message) {
    return (
      <div className="text-center text-green-600">
        {message}
      </div>
    );
  }

  return (
    <form id="login" className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="email">Email</Label>
            <Button
              type="button"
              disabled={isDisabled}
              onClick={sendLoginLink}
              variant="link"
              className="ml-auto h-5"
            >
              <LoadingIcon aria-disabled={isDisabled} />
              Send login link
            </Button>
          </div>
          <Input id="email" type="email" placeholder="username@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" required={passwordRequired} />
        </div>
        <Button type="button" className="w-full" disabled={isDisabled} onClick={signInWithPassword}>
          <LoadingIcon aria-disabled={isDisabled} />
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <GoogleSignInButton />
        <OpenIDConnectButton />
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
