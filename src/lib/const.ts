export const appName = process.env.NEXT_PUBLIC_APP_NAME || "authFire";
export const baseUrl = `https://${process.env.NEXT_PUBLIC_HOSTNAME}`;
export const emailLinkLoginUrl = `${baseUrl}/email-link-login`;
export const logoImageUrl = process.env.NEXT_PUBLIC_LOGO_IMAGE_URL || `${baseUrl}/images/logo.png`;
export const logoDarkImageUrl = process.env.NEXT_PUBLIC_LOGO_DARK_IMAGE_URL || `${baseUrl}/images/logo-dark.png`;
export const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || `${baseUrl}/privacy-policy`;
export const termsOfServiceUrl = process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL || `${baseUrl}/terms-of-service`;
export const idTokenVerificationUrl = process.env.NEXT_PUBLIC_ID_TOKEN_VERIFICATION_URL || "";
export const serverSignOutUrl = process.env.NEXT_PUBLIC_SERVER_SIGN_OUT_URL || "";
export const serverTokenUrl = process.env.NEXT_PUBLIC_SERVER_TOKEN_URL || "";
export const primaryColor = process.env.NEXT_THEME_PRIMARY_COLOR || "#171717";
export const primaryForegroundColor = process.env.NEXT_THEME_PRIMARY_FOREGROUND_COLOR || "#fafafa";
export const legalBusinessName = process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME || appName;
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const openIdConfig = {
  providerId: process.env.NEXT_PUBLIC_OPENID_CONNECT_PROVIDER_ID,
  name: process.env.NEXT_PUBLIC_OPENID_CONNECT_NAME,
  logoUrl: process.env.NEXT_PUBLIC_OPENID_CONNECT_LOGO_URL,
}
