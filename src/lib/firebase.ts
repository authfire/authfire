import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let appCheck: AppCheck;
const recaptchaSiteKey = process.env.NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY;

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

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const getAppCheckToken = async (forceRefresh: boolean = false) => {
  if (typeof window === 'undefined') {
    throw new Error("App Check is not available on the server side.");
  }
  const token = await getToken(appCheck, forceRefresh );
  return token.token;
}

const signIn = async (user: User) => {
  const idToken = await user.getIdToken();

  // Send the token to your API route
  const response = await fetch("/api/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Firebase-AppCheck': await getAppCheckToken()
    },
    body: JSON.stringify({ idToken }),
  });

  if (response.ok) {
    logEvent(analytics, 'signed_in', {
      uid: user.uid,
    });
    return true;
  }

  return false;
}

const signOut = async () => {
  const response = await fetch("/api/sign-out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-Firebase-AppCheck': await getAppCheckToken()
    },
  });

  if (response.ok) {
    await auth.signOut();
    logEvent(analytics, 'signed_out', {
      uid: auth.currentUser?.uid
    });
    window.location.reload()
    return true;
  }

  return false;
}

const onUserChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
}

export { auth, appCheck, db, storage, analytics, signIn, signOut, onUserChanged, getAppCheckToken };
export default app;
