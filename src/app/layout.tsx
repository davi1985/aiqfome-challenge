import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunitoFont = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'aiqfome Magalu',
  description: 'Frontend Challenge',
}

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
      <Header />
      {children}
    </body>
  </html>
)

export default RootLayout
