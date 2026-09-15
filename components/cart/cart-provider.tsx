'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ItemCarrinho, Produto } from '@/lib/types'

interface CartContextValue {
  carregado: boolean
  itens: ItemCarrinho[]
  adicionarItem: (produto: Produto, quantidade?: number) => void
  removerItem: (produtoId: number) => void
  atualizarQuantidade: (produtoId: number, quantidade: number) => void
  limpar: () => void
  totalItens: number
  precoTotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    try {
      const salvos: unknown = JSON.parse(localStorage.getItem('allbee_cart') ?? '[]')
      if (Array.isArray(salvos)) {
        const validos = salvos.filter((item): item is ItemCarrinho =>
          item && Number.isSafeInteger(item.quantidade) && item.quantidade > 0 &&
          item.produto && Number.isSafeInteger(item.produto.id) &&
          typeof item.produto.nome === 'string' &&
          Number.isFinite(Number(item.produto.preco)) && Number(item.produto.preco) >= 0 &&
          Number.isSafeInteger(item.produto.estoque) && item.produto.estoque >= item.quantidade,
        )
        // Restore browser storage only after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItens(validos)
      }
    } catch { /* Storage may be unavailable. Keep the cart in memory. */ }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (carregado) {
      try { localStorage.setItem('allbee_cart', JSON.stringify(itens)) } catch { /* Keep working in memory. */ }
    }
  }, [itens, carregado])

  function adicionarItem(produto: Produto, quantidade = 1) {
    if (!Number.isSafeInteger(quantidade) || quantidade <= 0 || produto.estoque <= 0) return
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

  function removerItem(produtoId: number) {
    setItens((anteriores) => anteriores.filter((item) => item.produto.id !== produtoId))
  }

  function atualizarQuantidade(produtoId: number, quantidade: number) {
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
    () => itens.reduce((soma, item) => soma + item.quantidade * Number(item.produto.preco), 0),
    [itens],
  )

  const value: CartContextValue = {
    carregado,
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
