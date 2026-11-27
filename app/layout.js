import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Alexander Dial | Portfolio",
  description:
    "Alexander Dial is a student developer at New York Tech who builds client websites, desktop apps and self-hosted tools.",
};

export const viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans bg-canvas text-ink antialiased min-h-[100dvh] flex flex-col">
        {children}
      </body>
    </html>
  );
}
