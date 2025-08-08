"use client";

import LinkToAuthfire from "@/components/link-to-authfire";
import { Button } from "@/components/ui/button";
import { appName, baseUrl } from "@/lib/const";
import { auth, signOut } from "@/lib/firebase";
import { useCurrentUser } from "@authfire/reactfire";
import { logEvent } from "firebase/analytics";
import { EmailAuthProvider, isSignInWithEmailLink, linkWithCredential, signInWithEmailLink } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const handleSignOut = async () => {
  await signOut(baseUrl)
}

export default function Home() {
  const { user } = useCurrentUser();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<string|null>();
  const [signingIn, setSigningIn] = useState(true);

  useEffect(() => {
    const currentUrl = window.location.href;
    const isSignInLink = isSignInWithEmailLink(auth, currentUrl)
    if (!isSignInLink) {
      setSigningIn(false);
      return;
    }

    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }

    if (!email) {
      setSigningIn(false);
      return;
    }

    signInWithEmailLink(auth, email, currentUrl)
      .then((userCredential) => {
        window.localStorage.removeItem('emailForSignIn');
        logEvent(auth, 'signed_in', {
          uid: userCredential.user.uid,
        });
      }).catch((error) => {
        console.error("Error signing in with email link:", error);
        setSigningIn(false);
      });
  }, [mode]);

  setMode(searchParams.get("mode"));
  if (mode === "signIn") {
    if (signingIn) {
      return (
        <div className="flex flex-col items-center justify-items-center h-full gap-64">
          <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
            <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
              <div className="mb-2 tracking-[-.01em]">
                Signing in...
              </div>
            </div>
          </main>
        </div>
      )
    } else {
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
  }

  return (
    <div className="flex flex-col items-center justify-items-center h-full gap-64">
      <main className="flex flex-col flex-auto gap-[32px] row-start-2 items-center sm:items-start">
        <div className="list-inside list-decimal text-sm/6 text-center sm:text-left">
          <div className="mb-2 tracking-[-.01em]">
            Hello, 
            {user ? ` ${user.displayName || user.email}` : " Guest"}! Welcome to {appName}.
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {user && (
            <Button
              type="button"
              onClick={handleSignOut}
              >
              Sign out
            </Button>
          )}
          {!user && (<>
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/login"
            >
              Login
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="/signup"
            >
              Sign up
            </a>
          </>)}
        </div>
      </main>
      <LinkToAuthfire />
    </div>
  );
}
