"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/tanstack";
import { AuthProvider } from "@/store/FirebaseAuthProvider";
import { useStore } from "@/store/zustand";

const ChildLayout = ({ children }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

export default ChildLayout;
