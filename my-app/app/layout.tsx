import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/navbar/Header";
import SmoothScroll from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "ADNH Catering",
  description: "ADNH Catering Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Header />
          <div className="pt-[88px]">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
