"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  Shield,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/store/FirebaseAuthProvider";
import { useCartItemCount } from "@/hooks/useCart";
import Link from "next/link";
import { useStore } from "@/store/zustand";
import { useRouter } from "next/navigation";

export default function UserMenuDropdown({ iconColor = "white" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { userRole, handleLogout } = useStore();
  const { data: cartCount } = useCartItemCount();
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = async () => {
    try {
      await handleLogout(router);
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-white/10 transition-all duration-200 border border-white/20"
      >
        <User className={`w-5 h-5 text-${iconColor}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            {user ? (
              <>
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {/* Cart Link */}
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <ShoppingCart className="w-4 h-4 mr-3" />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Admin Dashboard (only for admins) */}
                {userRole === "admin" ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Shield className="w-4 h-4 mr-3" />
                      <span>Admin Dashboard</span>
                    </div>
                  </Link>
                ) : (
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Settings className="w-4 h-4 mr-3" />
                      <span>Profile Settings</span>
                    </div>
                  </Link>
                )}

                {/* Logout */}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Not Logged In */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Welcome!</p>
                  <p className="text-xs text-gray-500">
                    Sign in to access your account
                  </p>
                </div>

                {/* Login Link */}
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <LogIn className="w-4 h-4 mr-3" />
                    <span>Sign In</span>
                  </div>
                </Link>

                {/* Register Link */}
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                    <User className="w-4 h-4 mr-3" />
                    <span>Create Account</span>
                  </div>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
