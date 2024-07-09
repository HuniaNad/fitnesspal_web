import './globals.css'
import type { Metadata } from 'next'
import { montserrat } from './font'

export const metadata: Metadata = {
  title: "Fitness Pal"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
