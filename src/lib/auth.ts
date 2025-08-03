import { auth, verifyIdToken } from "./firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [idTokenVerified, setIdTokenVerified] = useState<boolean | null>(null);

  onAuthStateChanged(auth, async (newUser) => {
    if (newUser?.uid === user?.uid) {
      return; // No change in user
    }

    setUser(newUser);
  });

  useEffect(() => {
    if (!user) {
      setIdTokenVerified(null);
      return;
    }

    verifyIdToken(user).then(setIdTokenVerified).catch((error) => {
      console.error("Error checking sign-in verification:", error);
      setIdTokenVerified(false);
    });
  }, [user]);

  return {
    user,
    idTokenVerified,
  };
}

export { useCurrentUser }
