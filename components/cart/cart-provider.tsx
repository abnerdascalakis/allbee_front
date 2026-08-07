'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i,
        )
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }]
    })
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, Math.min(quantity, i.product.stock)) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    )
  }

  function clear() {
    setItems([])
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
    [items],
  )

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
