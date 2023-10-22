import React, { useEffect, useState } from "react";
import { auth } from "./config";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "../models/User";


export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem('authUser') || '{}'),
  );

  useEffect(() => {
    const listener = auth.onAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user = User.convertFirebaseUser(firebaseUser);
        localStorage.setItem('authUser', JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener?.();
  }, [auth]);

  return { user };
}