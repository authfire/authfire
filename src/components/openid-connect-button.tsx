'use client'

import Image from 'next/image';
import { useState } from 'react';
import { toast } from "sonner";
import { baseUrl, openIdConfig } from "@/lib/const";
import { signIn } from '@authfire/core';
import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { useFirebase } from '@/lib/firebase';
import { getFriendlyErrorMessage } from '@/lib/error-handling';

export default function OpenIDConnectButton() {
  const { auth } = useFirebase();
  const [isDisabled, setIsDisabled] = useState(false);
  const { providerId, name, logoUrl } = openIdConfig;

  if (!auth || !providerId || !name || !logoUrl) {
    return null;
  }

  function signInWithOpenID(event: React.MouseEvent<HTMLButtonElement>) {
    if (!auth) return;
    event.preventDefault();
    setIsDisabled(true);

    const provider = new OAuthProvider(providerId || '');
    signIn(() => signInWithPopup(auth, provider))
      .then(() => {
        toast.success('Login successful!');
        window.location.href = baseUrl;
      })
      .finally(() => {
        setIsDisabled(false);
      })
      .catch((error) => {
        toast.error(getFriendlyErrorMessage(error));
      });
  }

  return (
    <button className="gsi-material-button" onClick={signInWithOpenID} disabled={isDisabled}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Image src={logoUrl} alt={name} width={24} height={24} />
        </div>
        <span className="gsi-material-button-contents">Sign in with {name}</span>
        <span style={{display: 'none'}}>Sign in with {name}</span>
      </div>
    </button>
  )
}
