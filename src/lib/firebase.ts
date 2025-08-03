import { firebaseConfig, idTokenVerificationUrl, recaptchaSiteKey, serverSignOutUrl, serverTokenUrl } from "./const";
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
  serverTokenUrl,
  recaptchaSiteKey
);
