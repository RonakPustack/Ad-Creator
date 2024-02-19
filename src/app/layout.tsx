import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthProvider'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Marketing Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        {/* <body className={inter.className}> */}
        <AuthProvider>
          <main className="h-full text-black">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
