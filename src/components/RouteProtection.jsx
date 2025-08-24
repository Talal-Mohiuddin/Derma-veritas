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
  redirectTo = "/login"
}) => {
  const { user, loading: authLoading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user || allowedRoles.length === 0) return;

      setRoleLoading(true);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setRoleLoading(false);
      }
    };

    if (user && allowedRoles.length > 0) {
      checkUserRole();
    }
  }, [user, allowedRoles]);

  useEffect(() => {
    // Don't redirect while auth is loading
    if (authLoading) return;

    // Check if authentication is required and user is not logged in
    if (requireAuth && !user) {
      router.push(redirectTo);
      return;
    }

    // Check role-based access
    if (allowedRoles.length > 0 && user && !roleLoading) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [user, userRole, authLoading, roleLoading, requireAuth, allowedRoles, router, redirectTo]);

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
  if (allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    return null;
  }

  return children;
};

export default RouteProtection;
