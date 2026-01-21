import './globals.css'

export const metadata = {
  title: 'CV Generator Pro - Créez votre CV professionnel',
  description: 'Générateur de CV moderne avec templates professionnels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
