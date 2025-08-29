"use client";

import { LoadingIcon } from "@/components/loading-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirebase } from "@/lib/firebase";
import { clearInput, getInputValue } from "@/lib/utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const { auth } = useFirebase();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!auth) return;
    event.preventDefault();
    setIsDisabled(true);

    const email = getInputValue("email");

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info('Password reset email sent! Check your inbox.', {
          duration: Infinity,
        });
        clearInput("email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode + ' ' + errorMessage);
      })
      .finally(() => {
        setIsDisabled(false);
      });
  };
  return (
    <form action='' onSubmit={handleSubmit} method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">
              Email
            </Label>
            <Input type="email" id="email" placeholder='username@example.com' required={true} />
          </div>
          <Button type='submit' className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-white shadow-sm shadow-neutral-200 dark:shadow-neutral-800 hover:bg-primary/90 h-9 px-4 py-2" disabled={isDisabled}>
            <LoadingIcon aria-disabled={isDisabled} />
            Reset password
          </Button>
        </div>
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
