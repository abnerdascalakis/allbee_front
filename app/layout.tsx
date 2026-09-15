import './globals.css'
import { AuthProvider } from '@/components/auth/auth-provider'
import { CartProvider } from '@/components/cart/cart-provider'
import { Toaster } from '@/components/ui/sonner'
import { obterUsuarioAtual } from '@/lib/session'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const usuario = await obterUsuarioAtual()
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <AuthProvider usuario={usuario}>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
