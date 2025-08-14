import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SupabaseListener from '@/app/components/supabase-listener'
import Header from "./components/layouts/header/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'taka-todo-next13',
  description: 'taka-todo-next13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>

        <div className="flex flex-col min-h-screen">

          {/* @ts-expect-error next version of TS will fix this */}
          <Header />
          <SupabaseListener />
          <main className="flex-1">{children}</main>

          <footer className="py-5">
            <div className="text-center text-sm">
              Copyright © All rights reserved | FullStackChannel
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
