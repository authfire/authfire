/**
 * Maps Firebase Auth error codes to user-friendly messages.
 * This prevents leaking sensitive information about the backend or authentication process.
 */
export function getFriendlyErrorMessage(error: any): string {
  const errorCode = error?.code;

  switch (errorCode) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'A sign-in popup was already open. Please complete that one or try again.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your information and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'The password is too weak.';
    case 'auth/invalid-email':
      return 'The email address is invalid.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
}
