'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/cart/cart-provider'
import { formatCurrency } from '@/lib/format'
import { CATEGORY_LABELS, type Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const outOfStock = product.stock <= 0

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-secondary"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur">
          {CATEGORY_LABELS[product.category]}
        </Badge>
        {outOfStock && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <span className="text-sm font-semibold">Esgotado</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold leading-tight hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-serif text-xl font-semibold">
            {formatCurrency(product.price)}
          </span>
          <Button
            size="sm"
            disabled={outOfStock}
            onClick={() => {
              addItem(product)
              toast.success('Adicionado ao carrinho', {
                description: product.name,
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
