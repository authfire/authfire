import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { baseUrl, firebaseConfig, idTokenVerificationUrl, recaptchaSiteKey, serverSignOutUrl } from "./const";
import { toast } from "sonner";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let appCheck: AppCheck;

if (typeof window !== 'undefined' && recaptchaSiteKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true
  });
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
let analytics: Analytics;
let currentUser: User | null = null;
let IsSignedIn = false;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const getAppCheckToken = async (forceRefresh: boolean = false) => {
  if (typeof window === 'undefined') {
    throw new Error("App Check is not available on the server side.");
  }
  const result = await getToken(appCheck, forceRefresh);
  return result.token;
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
  });

  if (response.ok) {
    logEvent(analytics, 'id_token_verified', {
      uid: user.uid,
    });
    const data = await response.json();
    if (data.status === 'success') {
      return data;
    }
  }

  toast.error('Failed to verify your login. Please try again.');
  return false;
}

const _signIn = (user: User, redirectUrl: string, passive: boolean = false) => {
  if (!user.emailVerified) {
    toast.error('Please verify your email address before logging in.');
    return false;
  }

  logEvent(analytics, 'signed_in', {
    uid: user.uid,
  });
  IsSignedIn = true;
  currentUser = user;

  if (!passive) {
    toast.success('Login successful!');
    window.location.href = redirectUrl;
  }

  return true;
}

const signIn = async (user: User, passive: boolean = false) => {
  let redirectUrl = baseUrl;

  if (idTokenVerificationUrl) {
    const data = await verifyIdToken(user);

    if (data) {
      // Redirect to the base URL or a specific page
      redirectUrl = data.redirectUrl || baseUrl;
    } else {
      toast.error('Failed to verify your login. Please try again.');
      return false;
    }
  }

  return _signIn(user, redirectUrl, passive);
}

const _signOut = async (redirectUrl: string) => {
  await auth.signOut();
  logEvent(analytics, 'signed_out', {
    uid: auth.currentUser?.uid
  });
  window.location.href = redirectUrl;
  return true;
};

const signOut = async () => {
  let redirectUrl = baseUrl;

  if (serverSignOutUrl) {
    const response = await fetch(serverSignOutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Firebase-AppCheck': await getAppCheckToken()
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'success') {
        logEvent(analytics, 'server_signed_out', {
          uid: auth.currentUser?.uid
        });
        redirectUrl = data.redirectUrl || baseUrl;
      }
    }
  }

  return _signOut(redirectUrl);
};

const onCurrentUserChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user && user.emailVerified && !IsSignedIn) {
      await signIn(user, true);
    }
    callback(currentUser);
  });
}

export { auth, appCheck, db, storage, analytics, signIn, signOut, onCurrentUserChange, getAppCheckToken, currentUser, IsSignedIn };
export default app;
