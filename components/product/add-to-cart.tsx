'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/types'

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const outOfStock = product.stock <= 0

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="grid size-11 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={outOfStock}
          aria-label="Diminuir quantidade"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-10 text-center font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="grid size-11 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={outOfStock || quantity >= product.stock}
          aria-label="Aumentar quantidade"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        size="lg"
        disabled={outOfStock}
        onClick={() => {
          addItem(product, quantity)
          toast.success('Adicionado ao carrinho', {
            description: `${quantity}x ${product.name}`,
          })
        }}
      >
        <ShoppingBag className="size-4" />
        {outOfStock ? 'Esgotado' : 'Adicionar ao carrinho'}
      </Button>
    </div>
  )
}
