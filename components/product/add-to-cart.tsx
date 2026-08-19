'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart/cart-provider'
import type { Produto } from '@/lib/types'

export function AddToCart({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const semEstoque = produto.estoque <= 0

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="grid size-11 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={semEstoque}
          aria-label="Diminuir quantidade"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-10 text-center font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => Math.min(produto.estoque, q + 1))}
          className="grid size-11 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          disabled={semEstoque || quantity >= produto.estoque}
          aria-label="Aumentar quantidade"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        size="lg"
        disabled={semEstoque}
        onClick={() => {
          adicionarItem(produto, quantity)
          toast.success('Adicionado ao carrinho', {
            description: `${quantity}x ${produto.nome}`,
          })
        }}
      >
        <ShoppingBag className="size-4" />
        {semEstoque ? 'Esgotado' : 'Adicionar ao carrinho'}
      </Button>
    </div>
  )
}
