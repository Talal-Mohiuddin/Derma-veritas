"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/zustand";
import { useState, useEffect, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
      </svg>
    ),
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    name: "Appointments",
    href: "/admin/appointments",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
  },
  {
    name: "Referral Rewards",
    href: "/admin/rewards",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user, handleLogout } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Generate initials from email or display name
  const getInitials = (user) => {
    if (!user) return "AD";

    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }

    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }

    return "AD";
  };

  const userEmail = user?.email || "admin@dermaveritas.com";
  const userInitials = getInitials(user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="ml-3 text-white text-lg font-semibold">
                DermaVeritas
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
                    }
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div
            className="p-4 border-t border-gray-700 relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center w-full text-left hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-medium">{userInitials}</span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {user?.displayName || "Admin User"}
                </p>
                <p className="text-xs text-gray-400">{userEmail}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DV</span>
            </div>
            <span className="ml-3 text-white text-lg font-semibold">
              DermaVeritas
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-md"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8 px-2 pb-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile bottom section with logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-medium">{userInitials}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user?.displayName || "Admin User"}
                </p>
                <p className="text-xs text-gray-400">{userEmail}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
