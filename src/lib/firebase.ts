import { firebaseConfig, idTokenVerificationUrl, recaptchaSiteKey, serverSignOutUrl } from "./const";
import { initialize } from "@authfire/jsfire";

export const {
  app,
  analytics,
  auth,
  appCheck,
  firestore,
  storage,
  getAppCheckToken,
  verifyIdToken,
  signIn,
  signOut
} = initialize(
  firebaseConfig,
  idTokenVerificationUrl,
  serverSignOutUrl,
  recaptchaSiteKey
);
