'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useCart } from './cart-provider'
import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { camposEntrega, type PedidoCriado } from '@/lib/checkout'
import { formatCurrency } from '@/lib/format'
import { finalizarPedido } from '@/app/checkout/actions'

export function CheckoutForm() {
  const { itens, carregado, precoTotal, limpar } = useCart()
  const { usuario } = useAuth()
  const [pedido, setPedido] = useState<PedidoCriado | null>(null)
  const [erro, setErro] = useState('')
  const [pendente, setPendente] = useState(false)
  const enviando = useRef(false)

  async function enviar(form: FormData) {
    if (enviando.current) return
    enviando.current = true
    setPendente(true)
    setErro('')
    try {
      const resposta = await finalizarPedido(form)
      if (resposta.pedido) {
        setPedido(resposta.pedido)
        limpar()
      } else setErro(resposta.erro ?? 'Não foi possível finalizar o pedido.')
    } catch {
      setErro('A conexão foi interrompida. Confira se o pedido foi registrado antes de tentar novamente.')
    } finally {
      enviando.current = false
      setPendente(false)
    }
  }

  if (pedido) return (
    <section className="mx-auto max-w-xl space-y-5 px-5 py-16 text-center" aria-live="polite">
      <CheckCircle2 className="mx-auto size-12 text-primary" />
      <h1 className="font-serif text-3xl font-semibold">Pedido recebido!</h1>
      <p>Seu pedido <strong>#{pedido.id}</strong> foi registrado.</p>
      <p>Status: {pedido.status.replaceAll('_', ' ')}</p>
      <p className="text-xl font-semibold">Total: {formatCurrency(pedido.total_centavos / 100)}</p>
      <Button render={<Link href="/produtos" />}>Continuar comprando</Button>
    </section>
  )

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/carrinho" className="text-sm text-primary hover:underline">← Voltar ao carrinho</Link>
      <h1 className="mt-4 font-serif text-3xl font-semibold">Finalizar pedido</h1>
      {!carregado ? <p className="mt-6" role="status">Carregando carrinho…</p> : !itens.length ? (
        <div className="mt-8 space-y-5"><p>Adicione produtos ao carrinho para finalizar seu pedido.</p><Button render={<Link href="/produtos" />}>Ver produtos</Button></div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
          <section>
            {!usuario ? (
              <div className="space-y-5 rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-semibold">Entre para continuar</h2>
                <p className="text-muted-foreground">Seu carrinho fica salvo enquanto você entra ou cria sua conta.</p>
                <Button render={<Link href="/auth/login?next=/checkout" />}>Entrar na minha conta</Button>
                <Link href="/auth/cadastro?next=/checkout" className="block text-sm text-primary hover:underline">Criar conta</Link>
              </div>
            ) : (
              <form action={enviar} aria-busy={pendente} className="space-y-6 rounded-xl border bg-card p-6">
                <h2 className="font-serif text-xl font-semibold">Dados de entrega</h2>
                <p className="text-sm text-muted-foreground">Pedido de {usuario.nome} · {usuario.email}</p>
                <input type="hidden" name="itens" value={JSON.stringify(itens.map(({ produto, quantidade }) => ({ produto_id: produto.id, quantidade })))} />
                <fieldset disabled={pendente} className="grid gap-4 sm:grid-cols-2">
                  {camposEntrega.map(({ name, label, required, autoComplete }) => (
                    <div key={name} className="space-y-2">
                      <Label htmlFor={name}>{label}{!required && ' (opcional)'}</Label>
                      <Input id={name} name={name} required={required} autoComplete={autoComplete}
                        maxLength={name === 'cep' ? 9 : 200}
                        pattern={name === 'cep' ? '[0-9]{5}-?[0-9]{3}' : undefined}
                        placeholder={name === 'cep' ? '00000-000' : undefined}
                        type={name === 'telefone_destinatario' ? 'tel' : 'text'}
                        defaultValue={name === 'nome_destinatario' ? usuario.nome : undefined} />
                    </div>
                  ))}
                </fieldset>
                {erro && <div role="alert" className="space-y-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"><p>{erro}</p><Link className="underline" href="/auth/login?next=/checkout">Entrar novamente</Link></div>}
                <Button type="submit" size="lg" className="w-full" disabled={pendente}>
                  {pendente && <Loader2 className="size-4 animate-spin" />}
                  {pendente ? 'Enviando pedido…' : 'Confirmar pedido'}
                </Button>
              </form>
            )}
          </section>
          <aside className="h-fit space-y-5 rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Resumo do pedido</h2>
            <ul className="space-y-4">{itens.map(({ produto, quantidade }) => <li key={produto.id} className="flex justify-between gap-4 text-sm"><span>{quantidade}× {produto.nome}</span><strong className="whitespace-nowrap">{formatCurrency(Number(produto.preco) * quantidade)}</strong></li>)}</ul>
            <div className="flex justify-between border-t pt-4"><span>Subtotal dos produtos</span><strong>{formatCurrency(precoTotal)}</strong></div>
            <p className="text-sm text-muted-foreground">O valor final será informado na confirmação do pedido. A confirmação registra o pedido; o pagamento ainda não é realizado nesta tela.</p>
          </aside>
        </div>
      )}
    </div>
  )
}
