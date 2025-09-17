"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/store/FirebaseAuthProvider";
import { queryClient } from "@/config/tanstack";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatwindow from "@/components/Chatwindow";
import { useStore } from "@/store/zustand";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChildLayout = ({ children }) => {
  const pathname = usePathname();
  const ShowNavbar = pathname === "/login" || pathname.includes("/admin");
  const addPadding =
    pathname === "/" || pathname.includes("/admin") || pathname === "/login"
      ? "calc(100vh - 4rem)"
      : "";

  const { isChatOpen, setIsChatOpen } = useStore();

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

        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              className="bg-black hover:bg-gray-800 text-white rounded-full px-6 py-3 flex items-center gap-3 shadow-lg transition-colors"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle
                className="w-20 h-20"
                style={{ width: "24px", height: "24px" }}
              />
              <span className="font-medium">DV Assistant</span>
            </Button>
          </div>
        </div>

        <Chatwindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default ChildLayout;
