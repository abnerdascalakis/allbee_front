'use client'

import Link from 'next/link'
import { useCart } from './cart-provider'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/format'

export function CartPage() {
  const { itens, carregado, precoTotal, atualizarQuantidade, removerItem } = useCart()
  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Seu carrinho</h1>
      {!carregado ? <p className="mt-6" role="status">Carregando carrinho…</p> : !itens.length ? (
        <div className="mt-8 space-y-5"><p className="text-muted-foreground">Seu carrinho está vazio.</p><Button render={<Link href="/produtos" />}>Ver produtos</Button></div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {itens.map(({ produto, quantidade }) => (
              <article key={produto.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-5">
                <div><Link href={`/produtos/${produto.id}`} className="font-semibold hover:underline">{produto.nome}</Link><p className="text-sm text-muted-foreground">{formatCurrency(produto.preco)} / unidade</p></div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" aria-label={`Diminuir quantidade de ${produto.nome}`} onClick={() => atualizarQuantidade(produto.id, quantidade - 1)}>−</Button>
                  <span aria-live="polite">{quantidade}</span>
                  <Button variant="outline" size="icon" aria-label={`Aumentar quantidade de ${produto.nome}`} disabled={quantidade >= produto.estoque} onClick={() => atualizarQuantidade(produto.id, quantidade + 1)}>+</Button>
                </div>
                <span className="font-semibold">{formatCurrency(Number(produto.preco) * quantidade)}</span>
                <Button variant="ghost" onClick={() => removerItem(produto.id)} aria-label={`Remover ${produto.nome}`}>Remover</Button>
              </article>
            ))}
            <Link href="/produtos" className="inline-block text-sm text-primary hover:underline">Continuar comprando</Link>
          </div>
          <aside className="h-fit space-y-5 rounded-xl border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold">Resumo</h2>
            <div className="flex justify-between"><span>Subtotal</span><strong>{formatCurrency(precoTotal)}</strong></div>
            <p className="text-sm text-muted-foreground">Confira seus dados de entrega na próxima etapa.</p>
            <Button className="w-full" size="lg" render={<Link href="/checkout" />}>Finalizar pedido</Button>
          </aside>
        </div>
      )}
    </div>
  )
}
