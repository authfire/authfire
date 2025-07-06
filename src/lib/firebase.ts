import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AppCheck, getToken, initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { Analytics, getAnalytics } from "firebase/analytics";
import { firebaseConfig, recaptchaSiteKey } from "./const";

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

export { auth, appCheck, db, storage, analytics, getAppCheckToken };
export default app;
