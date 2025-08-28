import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import app, { db } from "@/config/db";
import { useStore } from "./zustand";

const defaultAuthContext = {
  user: null,
  loading: true,
  error: null,
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const { user, setUser, setUserRole } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);
          
          if (currentUser) {
            // Fetch user role from Firestore
            try {
              const userDocRef = doc(db, "users", currentUser.uid);
              const userDoc = await getDoc(userDocRef);
              
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserRole(userData.role || null);
              } else {
                setUserRole(null);
              }
            } catch (roleError) {
              console.error("Error fetching user role:", roleError);
              setUserRole(null);
            }
          } else {
            setUserRole(null);
          }
          
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [setUser, setUserRole]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
