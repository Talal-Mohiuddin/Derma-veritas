import Link from "next/link";
import Image from "next/image";
import csrf from "csrf";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  const tokens = new csrf();
  const token = tokens.create(process.env.CSRF_SECRET);
  return (
    <div className="flex flex-col w-full items-center min-h-screen gap-8 justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/logo_black.svg"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-light text-gray-900">
            Welcome to DermaVeritas
          </h2>
        </div>
        <LoginForm csrfToken={token} />
        <div className="space-y-2">
          <div className="text-center mt-4">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-black"
            >
              Forgot your password? Click here to reset
            </Link>
          </div>
        </div>
      </div>
      <p className="fixed bottom-4 text-xs text-gray-600">
        By logging in, you agree to our{" "}
        <Link
          href="/termsofservice"
          className="text-black hover:text-gray-700 underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="https://venuexai.com/?page_id=3"
          className="text-black hover:text-gray-700 underline"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
