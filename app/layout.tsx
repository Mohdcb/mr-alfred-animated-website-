import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google";
import "./globals.css" ;
import { Toaster } from 'react-hot-toast' ;



export const metadata: Metadata = {
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
   
    <html lang="en">
      <body className="font-gilroy bg-white" >
        <div className="b">{children}</div>
        
      </body>
    </html>
   
  )
}

