import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import ChildLayout from ".";
import { gtmId, headSnippet, bodySnippet } from "@/config/gtm";

export const metadata = {
  title: "DermaVeritas",
  description: "Skin Clinic & Wellness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: headSnippet }} />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: bodySnippet }} />
        <ChildLayout>{children}</ChildLayout>
      </body>
    </html>
  );
}
