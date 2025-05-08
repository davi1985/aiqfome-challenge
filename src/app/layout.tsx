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
    <body
      className={`${nunitoFont.className}  antialiased`}
      suppressHydrationWarning
    >
      {children}
    </body>
  </html>
)

export default RootLayout
