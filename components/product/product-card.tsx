'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/cart/cart-provider'
import { formatCurrency } from '@/lib/format'
import { ROTULOS_CATEGORIAS, type Produto } from '@/lib/types'

export function ProductCard({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCart()
  const semEstoque = produto.estoque <= 0

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/produtos/${produto.slug}`}
        className="relative aspect-square overflow-hidden bg-secondary"
      >
        <Image
          src={produto.imagem || '/placeholder.svg'}
          alt={produto.nome}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur">
          {ROTULOS_CATEGORIAS[produto.categoria]}
        </Badge>
        {semEstoque && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <span className="text-sm font-semibold">Esgotado</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/produtos/${produto.slug}`}>
          <h3 className="font-serif text-lg font-semibold leading-tight hover:text-primary">
            {produto.nome}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {produto.descricaoCurta}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-serif text-xl font-semibold">
            {formatCurrency(produto.preco)}
          </span>
          <Button
            size="sm"
            disabled={semEstoque}
            onClick={() => {
              adicionarItem(produto)
              toast.success('Adicionado ao carrinho', {
                description: produto.nome,
              })
            }}
          >
            <ShoppingBag className="size-4" />
            Comprar
          </Button>
        </div>
      </div>
    </div>
  )
}
