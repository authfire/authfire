export const appName = process.env.NEXT_PUBLIC_APP_NAME || "AuthFire";
export const baseUrl = `https://${process.env.NEXT_PUBLIC_HOSTNAME}`;
export const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || `${baseUrl}/privacy-policy`;
export const termsOfServiceUrl = process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL || `${baseUrl}/terms-of-service`;
export const idTokenVerificationUrl = process.env.NEXT_PUBLIC_ID_TOKEN_VERIFICATION_URL;
export const serverSignOutUrl = process.env.NEXT_PUBLIC_SERVER_SIGN_OUT_URL;
