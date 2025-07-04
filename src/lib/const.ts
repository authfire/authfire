const env = process.env

export const appName = env.NEXT_PUBLIC_APP_NAME || "authFire";
export const baseUrl = `https://${env.NEXT_PUBLIC_HOSTNAME}`;
export const logoImageUrl = env.NEXT_PUBLIC_LOGO_IMAGE_URL || `${baseUrl}/images/logo.png`;
export const logoDarkImageUrl = env.NEXT_PUBLIC_LOGO_DARK_IMAGE_URL || `${baseUrl}/images/logo-dark.png`;
export const privacyPolicyUrl = env.NEXT_PUBLIC_PRIVACY_POLICY_URL || `${baseUrl}/privacy-policy`;
export const termsOfServiceUrl = env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL || `${baseUrl}/terms-of-service`;
export const idTokenVerificationUrl = env.NEXT_PUBLIC_ID_TOKEN_VERIFICATION_URL;
export const serverSignOutUrl = env.NEXT_PUBLIC_SERVER_SIGN_OUT_URL;
export const primaryColor = env.NEXT_THEME_PRIMARY_COLOR || "#171717";
export const primaryForegroundColor = env.NEXT_THEME_PRIMARY_FOREGROUND_COLOR || "#fafafa";
export const legalBusinessName = env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME || appName;
export const recaptchaSiteKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
