"use client";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/store/FirebaseAuthProvider";
import { queryClient } from "@/config/tanstack";

const ChildLayout = ({ children }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

export default ChildLayout;
