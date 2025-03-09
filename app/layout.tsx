import type React from "react"
import type { Metadata } from "next"
import "./globals.css";

export const metadata: Metadata = {
  // Your metadata here
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-gilroy bg-white overflow-x-hidden max-w-full">
        <div className=" w-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}