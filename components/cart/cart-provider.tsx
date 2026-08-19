'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ItemCarrinho, Produto } from '@/lib/types'

interface CartContextValue {
  itens: ItemCarrinho[]
  adicionarItem: (produto: Produto, quantidade?: number) => void
  removerItem: (produtoId: string) => void
  atualizarQuantidade: (produtoId: string, quantidade: number) => void
  limpar: () => void
  totalItens: number
  precoTotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  function adicionarItem(produto: Produto, quantidade = 1) {
    setItens((anteriores) => {
      const existente = anteriores.find((item) => item.produto.id === produto.id)
      if (existente) {
        return anteriores.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: Math.min(item.quantidade + quantidade, produto.estoque) }
            : item,
        )
      }
      return [...anteriores, { produto, quantidade: Math.min(quantidade, produto.estoque) }]
    })
  }

  function removerItem(produtoId: string) {
    setItens((anteriores) => anteriores.filter((item) => item.produto.id !== produtoId))
  }

  function atualizarQuantidade(produtoId: string, quantidade: number) {
    setItens((anteriores) =>
      anteriores
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: Math.max(0, Math.min(quantidade, item.produto.estoque)) }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    )
  }

  function limpar() {
    setItens([])
  }

  const totalItens = useMemo(
    () => itens.reduce((soma, item) => soma + item.quantidade, 0),
    [itens],
  )
  const precoTotal = useMemo(
    () => itens.reduce((soma, item) => soma + item.quantidade * item.produto.preco, 0),
    [itens],
  )

  const value: CartContextValue = {
    itens,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    limpar,
    totalItens,
    precoTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
