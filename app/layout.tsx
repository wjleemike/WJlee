import type { Metadata } from "next";
import "./globals.css";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "TOEIC 風格練習 | Unofficial TOEIC Practice",
  description:
    "Unofficial TOEIC-style practice for Listening, Reading, Speaking, and Writing. Original questions only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen antialiased">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-6 sm:px-6">
          <header className="mb-8">
            <a href="/" className="inline-block">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Unofficial Practice
              </p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                TOEIC 風格練習站
              </h1>
            </a>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-200 pt-6 pb-2">
            <Disclaimer compact />
          </footer>
        </div>
      </body>
    </html>
  );
}
