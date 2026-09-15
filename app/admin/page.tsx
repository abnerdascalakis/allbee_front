import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'
import { obterUsuarioAtual } from '@/lib/session'
import { SiteHeader } from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default async function AdminPage() {
  const usuario = await obterUsuarioAtual()
  if (!usuario) redirect('/auth/login')
  if (usuario.role !== 'admin') redirect('/')

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
        <div className="max-w-2xl rounded-2xl border bg-card p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayoutDashboard className="size-6" />
          </div>
          <p className="mb-2 text-sm font-semibold text-primary">Administração AllBee</p>
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Olá, {usuario.nome}!</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bem-vindo ao painel administrativo. Em breve, você poderá gerenciar a loja por aqui.
          </p>
          <Button className="mt-8" variant="outline" render={<Link href="/" />}>Voltar para a loja</Button>
        </div>
      </main>
    </>
  )
}
