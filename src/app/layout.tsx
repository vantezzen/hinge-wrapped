import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wrapped for Hinge",
  description: "Your time on Hinge 🚀",
};

const PLAUSIBLE_EVENTS =
  "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>

      <body className={`${inter.className} w-screen min-h-screen`}>
        {children}

        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          data-collect-dnt="true"
        />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
        <Script
          data-domain="hinge.vantezzen.io"
          src="https://a.vantezzen.io/js/script.tagged-events.js"
        />
        <script dangerouslySetInnerHTML={{ __html: PLAUSIBLE_EVENTS }}></script>
      </body>
    </html>
  );
}
