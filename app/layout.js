import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Alexander Dial | Portfolio",
  description:
    "Alexander Dial is a student developer at New York Tech who builds client websites, desktop apps and self-hosted tools.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><rect width=%2264%22 height=%2264%22 rx=%2214%22 fill=%22%231f7a54%22/><text x=%2232%22 y=%2242%22 font-family=%22Arial,sans-serif%22 font-size=%2226%22 font-weight=%22700%22 fill=%22white%22 text-anchor=%22middle%22>AD</text></svg>",
  },
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
