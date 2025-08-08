import { Analytics, getAnalytics, logEvent as _logEvent } from "firebase/analytics";
import { baseUrl, firebaseConfig, idTokenVerificationUrl, recaptchaSiteKey, serverSignOutUrl, serverTokenUrl } from "./const";
import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeJsFire } from "@authfire/reactfire";

let app: FirebaseApp

try {
  app = getApp() || initializeApp(firebaseConfig)
} catch {
  app = initializeApp(firebaseConfig);
}

let appCheck: AppCheck|undefined = undefined

if (typeof window !== 'undefined' && recaptchaSiteKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true
  });
}

const auth = getAuth(app);
const firestore = getFirestore(app);

let analytics: Analytics|undefined = undefined
if (typeof window !== 'undefined') {
  // Ensure that Firebase Analytics is only initialized in the browser environment
  analytics = getAnalytics(app);
}

const getAppCheckToken = async (forceRefresh: boolean = false) => {
  if (typeof window === 'undefined') {
    throw new Error("App Check is not available on the server side.");
  } else if (!appCheck) {
    throw new Error("App Check is not initialized. Ensure recaptchaSiteKey is set.");
  }
  const result = await getToken(appCheck, forceRefresh);
  return result.token;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (!analytics) {
    console.warn("Analytics is not available in this environment.");
    return;
  }
  _logEvent(analytics, eventName, eventParams);
}

initializeJsFire({
  baseUrl,
  idTokenVerificationUrl,
  serverTokenUrl,
  serverSignOutUrl,
  getAppCheckToken,
  logEvent
})

export { app, firestore, auth, appCheck, analytics, logEvent, getAppCheckToken };
