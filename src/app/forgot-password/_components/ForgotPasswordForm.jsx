"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { auth } from "@/config/db";
import { sendPasswordResetEmail } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    // Validate email
    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset email sent! Please check your inbox and follow the instructions to reset your password."
      );
      setEmail(""); // Clear the email field after successful submission
    } catch (error) {
      console.error("Password reset error:", error);

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later");
          break;
        default:
          setError("Failed to send reset email. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          onClick={() => router.push("/")}
          src="/logo.svg"
          alt="Logo"
          width={60}
          height={60}
          className="mx-auto cursor-pointer"
        />
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address below to receive a password reset link:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePasswordReset();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handlePasswordReset}
                disabled={loading || !email}
                className="w-full bg-[#0042af] hover:bg-[#003399]"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Email"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                disabled={loading}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
            {message && (
              <Alert variant="default" className="mt-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
