import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "온라인 마음쓰레기통",
  description: "말하고, 버리고, 흔적 없이 사라지는 감정 쓰레기통",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
