import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "zapfolio ob theme",
  description: "create your portfolio website in two clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
