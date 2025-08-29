"use client";

import { useFirebase } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";

export default function Page() {
  const { auth } = useFirebase();
  const Loading =
      <div className="flex flex-col items-center justify-items-center h-full gap-64">
        <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
          <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
            <div className="mb-2 tracking-[-.01em]">
              Loading...
            </div>
          </div>
        </main>
      </div>

  function SignIn() {
    const searchParams = useSearchParams();
    if (!auth) return Loading;
    const mode = searchParams.get("mode");

    if (mode !== "signIn") {
      return (
        <div className="flex flex-col items-center justify-items-center h-full gap-64">
          <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <div className="mb-2 tracking-[-.01em]">
                Invalid sign-in link. Please try again.
              </div>
            </div>
          </main>
        </div>
      );
    }

    const currentUrl = window.location.href;
    const isSignInLink = isSignInWithEmailLink(auth, currentUrl)
    if (!isSignInLink) {
      return (
        <div className="flex flex-col items-center justify-items-center h-full gap-64">
          <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <div className="mb-2 tracking-[-.01em]">
                Invalid sign-in link. Please try again.
              </div>
            </div>
          </main>
        </div>
      );
    }

    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }

    if (!email) {
      return (
        <div className="flex flex-col items-center justify-items-center h-full gap-64">
          <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <div className="mb-2 tracking-[-.01em]">
                Email is required to sign in.
              </div>
            </div>
          </main>
        </div>
      );
    }

    signInWithEmailLink(auth, email, currentUrl)
      .then((userCredential) => {
        window.localStorage.removeItem('emailForSignIn');
        logEvent(auth, 'signed_in', {
          uid: userCredential.user.uid,
        });
        redirect("/");
      }).catch((error) => {
        console.error("Error signing in with email link:", error);
        toast.error("Error signing in with email link: " + error.message, {
          duration: Infinity,
        });
      });


    return (
      <div className="flex flex-col items-center justify-items-center h-full gap-64">
        <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
          <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
            <div className="mb-2 tracking-[-.01em]">
              Signing in with email link...
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <Suspense fallback={Loading}>
      <SignIn />
    </Suspense>
  )
}
