"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/db";
import { LoaderCircle } from "lucide-react";

const RouteProtection = ({
  children,
  allowedRoles = [],
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const { user, loading: authLoading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleLoadAttempted, setRoleLoadAttempted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      // Only fetch role if we have a user AND allowedRoles are specified
      if (!user || allowedRoles.length === 0) {
        setUserRole(null);
        setRoleLoading(false);
        setRoleLoadAttempted(true);
        return;
      }

      setRoleLoading(true);
      setRoleLoadAttempted(false);

      // Add a timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Firestore query timeout")), 10000);
      });

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await Promise.race([
          getDoc(userDocRef),
          timeoutPromise,
        ]);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role || null);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setRoleLoading(false);
        setRoleLoadAttempted(true);
      }
    };

    // Reset states when user changes
    if (!user) {
      setUserRole(null);
      setRoleLoading(false);
      setRoleLoadAttempted(false);
      return;
    }

    // Only run when auth is not loading and we have a user and haven't attempted yet
    if (!authLoading && user && !roleLoadAttempted) {
      checkUserRole();
    }
  }, [user?.uid, allowedRoles.length, authLoading, roleLoadAttempted]);

  useEffect(() => {
    // Don't do anything while auth or role is loading
    if (authLoading) return;

    // Don't do anything while role is loading (for role-based routes)
    if (allowedRoles.length > 0 && roleLoading) return;

    // Check if authentication is required and user is not logged in
    if (requireAuth && !user) {
      router.push(redirectTo);
      return;
    }

    // Check role-based access - only when role loading is complete
    if (allowedRoles.length > 0 && user) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push("/login");
        return;
      }
    }
  }, [
    user,
    userRole,
    authLoading,
    roleLoading,
    requireAuth,
    allowedRoles,
    router,
    redirectTo,
  ]);

  // Show loading while checking authentication or roles
  if (authLoading || (allowedRoles.length > 0 && roleLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  // Don't render children if user is not authenticated (when auth is required)
  if (requireAuth && !user) {
    return null;
  }

  // Don't render children if user doesn't have required role
  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return null;
  }

  return children;
};

export default RouteProtection;
