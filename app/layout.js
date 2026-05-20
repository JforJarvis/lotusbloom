import './globals.css'

export const metadata = {
  title: 'LotusBloom LLC — Data Operations & Agriculture',
  description: 'Intelligent Systems. Smarter Decisions. Sustainable Farming. Healthier Futures.',
  icons: { icon: '/favicon.png', apple: '/logo.png' },
  openGraph: { title: 'LotusBloom LLC', description: 'Data Operations & Agriculture', images: ['/hero.jpg'] },
}

export const viewport = { width: 'device-width', initialScale: 1, maximumScale: 1, themeColor: '#020204' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
