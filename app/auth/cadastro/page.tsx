import { AuthPage } from '@/components/auth/auth-page'

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams
  return <AuthPage modo="cadastro" destino={next === '/checkout' ? '/checkout' : undefined} />
}
