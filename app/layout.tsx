import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google";
import "./globals.css" ;
import { Toaster } from 'react-hot-toast' ;
import ObserverProvider from './ObserverProvider';


export const metadata: Metadata = {
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ObserverProvider> 
    <html lang="en">
      <body className="font-gilroy bg-white" >
        <div className="b">{children}</div>
        
      </body>
    </html>
    </ObserverProvider> 
  )
}

