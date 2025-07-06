import { toast } from "sonner";
import { analytics, appCheck, auth, getAppCheckToken } from "./firebase"
import { AuthProvider, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, User, UserCredential } from "firebase/auth"
import { baseUrl, idTokenVerificationUrl, serverSignOutUrl } from "./const";
import { logEvent } from "firebase/analytics";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [idTokenVerified, setIdTokenVerified] = useState<boolean | null>(null);

  onAuthStateChanged(auth, async (newUser) => {
    if (newUser?.uid === user?.uid) {
      return; // No change in user
    }

    setUser(newUser);
  });

  useEffect(() => {
    if (!user) {
      setIdTokenVerified(null);
      return;
    }

    verifyIdToken(user).then(setIdTokenVerified).catch((error) => {
      console.error("Error checking sign-in verification:", error);
      setIdTokenVerified(false);
    });
  }, [user]);

  return {
    user,
    idTokenVerified,
  };
}

const verifyIdToken = async (user: User) => {
  if (!idTokenVerificationUrl) {
    throw new Error("ID Token verification URL is not set.");
  }

  const idToken = await user.getIdToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (appCheck) {
    headers['X-Firebase-AppCheck'] = await getAppCheckToken();
  }

  // Send the token to your API route
  const response = await fetch(idTokenVerificationUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ idToken }),
    credentials: 'include',
  });

  if (response.ok) {
    logEvent(analytics, 'id_token_verified', {
      uid: user.uid,
    });
    return true;
  }

  console.error('Failed to verify ID token:', response.statusText);
  return false;
}

type SignInParams = {
  email?: string;
  password?: string;
  provider?: AuthProvider;
}

const signIn = async ({ email, password, provider }: SignInParams) => {
  let userCredential: UserCredential;

  try {
    if (provider) {
      userCredential = await signInWithPopup(auth, provider);
    } else if (email && password) {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } else {
      throw new Error("Either provider or email/password must be provided for sign-in.");
    }
  } catch (error) {
    console.error("Error signing in with popup:", error);
    throw error; // Re-throw the error for further handling if needed
  }

  logEvent(analytics, 'signed_in', {
    uid: userCredential.user.uid,
  });

  return userCredential;
}

const signOut = async () => {
  let redirectUrl = baseUrl;
  const uid = auth.currentUser?.uid;

  if (serverSignOutUrl) {
    const response = await fetch(serverSignOutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Firebase-AppCheck': await getAppCheckToken()
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        logEvent(analytics, 'server_signed_out', {
          uid
        });
        redirectUrl = data.redirectUrl || baseUrl;
      }
    }
  }

  await auth.signOut();

  logEvent(analytics, 'signed_out', {
    uid
  });

  toast.success('You have been signed out successfully.');

  window.location.href = redirectUrl;
  return true;
};

export { signIn, signOut, useCurrentUser }
