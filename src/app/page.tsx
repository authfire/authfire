"use client";

import { Button } from "@/components/ui/button";
import { appName } from "@/lib/const";
import { currentUser, onCurrentUserChange, signOut } from "@/lib/firebase";
import { useState } from "react";
import GitHubButton from "react-github-btn";

export default function Home() {
  const [user, setUser] = useState(currentUser);
  onCurrentUserChange(setUser);

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
              onClick={signOut}
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
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="/signup"
            >
              Sign up
            </a>
          </>)}
        </div>
      </main>
      <div className="row-start-3 flex flex-none gap-[24px] flex-wrap items-center justify-center">
        <GitHubButton href="https://github.com/authfire/authfire" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star authfire/authfire on GitHub">Star on GitHub</GitHubButton>
      </div>
    </div>
  );
}
