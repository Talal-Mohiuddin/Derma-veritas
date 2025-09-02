"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/store/FirebaseAuthProvider";
import { queryClient } from "@/config/tanstack";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ChildLayout = ({ children }) => {
  const pathname = usePathname();
  const ShowNavbar = pathname === "/login" || pathname.includes("/admin");
  const addPadding = pathname === "/" ? "calc(100vh - 4rem)" : "";

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "0.75rem",
              fontSize: "14px",
            },
            success: {
              style: {
                borderLeft: "4px solid #10b981",
              },
            },
            error: {
              style: {
                borderLeft: "4px solid #ef4444",
              },
            },
            loading: {
              style: {
                borderLeft: "4px solid #8b5cf6",
              },
            },
          }}
        />
        {!ShowNavbar && <Navbar />}
        <div
          className={`  
             ${addPadding ? "" : "pt-20"}`}
        >
          {children}
        </div>
        {!ShowNavbar && <Footer />}
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default ChildLayout;
