'use client'

import { Header } from '@/components/header'
import { Nunito } from 'next/font/google'
import './globals.css'
import { HeaderProvider } from '@/contexts/header'

const nunitoFont = Nunito({
  subsets: ['latin'],
})

// const metadata: Metadata = {
//   title: 'aiqfome Magalu',
//   description: 'Frontend Challenge',
// }

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="pt-BR">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />

    <body
      className={`${nunitoFont.className}  antialiased overflow-auto`}
      suppressHydrationWarning
    >
      <HeaderProvider>
        <Header />
        {children}
      </HeaderProvider>
    </body>
  </html>
)

export default RootLayout
