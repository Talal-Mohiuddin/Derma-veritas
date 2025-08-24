"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, googleProvider, db } from "@/config/db";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function LoginForm({ csrfToken }) {
  const [isSignup, setIsSignup] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const createUserDocument = async (user, displayName = null) => {
    try {
      // Check if user document already exists
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User document already exists");
        return;
      }

      // Create new user document
      const userData = {
        name: displayName || user.displayName || inputValue.name || user.email.split("@")[0],
        email: user.email.toLowerCase().trim(),
        role: "user",
        Buyinghistory: [],
        plan: null,
        isBanned: false,
        createdAt: new Date(),
      };

      await setDoc(userDocRef, userData);
      console.log("User document created successfully");
    } catch (error) {
      console.error("Error creating user document:", error);
      // Don't throw here to avoid breaking the auth flow
    }
  };

  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // Validate passwords match
        if (inputValue.password !== inputValue.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Validate password length
        if (inputValue.password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          inputValue.email,
          inputValue.password
        );

        // Create user document in Firestore
        await createUserDocument(userCredential.user, inputValue.name);

        toast({
          title: "Success",
          description: "Account created successfully!",
        });
      } else {
        await signInWithEmailAndPassword(
          auth,
          inputValue.email,
          inputValue.password
        );

        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
      }

      router.push("/");
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          `Failed to ${
            isSignup ? "create account" : "log in"
          }. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Always try to create user document (API will handle existing users)
      await createUserDocument(result.user);

      toast({
        title: "Success",
        description: "Logged in with Google successfully!",
      });

      router.push("/");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to log in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const trimmedValue =
      id === "password" || id === "confirmPassword" ? value.trim() : value;
    setInputValue((prev) => ({ ...prev, [id]: trimmedValue }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setInputValue({ email: "", password: "", confirmPassword: "", name: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setIsSignup(false)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              !isSignup
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignup(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isSignup
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleEmailLogin}>
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div className="rounded-md space-y-4">
          {isSignup && (
            <div>
              <Label htmlFor="name" className="sr-only">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
                value={inputValue.name}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={inputValue.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="relative">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
              placeholder={
                isSignup ? "Password (min. 6 characters)" : "Password"
              }
              value={inputValue.password}
              onChange={handleInputChange}
              disabled={loading}
              minLength={isSignup ? 6 : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {isSignup && (
            <div className="relative">
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Confirm password"
                value={inputValue.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleConfirmPasswordVisibility}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          )}
        </div>

        <div>
          <Button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0042af] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign in"
            )}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
