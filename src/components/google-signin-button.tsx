'use client'

import { GoogleAuthProvider } from "firebase/auth";
import Image from 'next/image'
import { useState } from 'react';
import { toast } from "sonner";
import { signIn } from "@/lib/auth";
import { baseUrl } from "@/lib/const";

export default function GoogleSignInButton() {
  const [isDisabled, setIsDisabled] = useState(false);

  function signInWithGoogle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDisabled(true);

    const provider = new GoogleAuthProvider();
    signIn({ provider })
      .then(() => {
        toast.success('Login successful!');
        window.location.href = baseUrl;
      })
      .finally(() => {
        setIsDisabled(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error signing in with Google: ${errorCode} - ${errorMessage}`);
      });
  }

  return (
    <button className="gsi-material-button" onClick={signInWithGoogle} disabled={isDisabled}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Image src="/images/google-sign-in-icon.svg" alt="Google" width={24} height={24} />
        </div>
        <span className="gsi-material-button-contents">Sign in with Google</span>
        <span style={{display: 'none'}}>Sign in with Google</span>
      </div>
    </button>
  )
}
