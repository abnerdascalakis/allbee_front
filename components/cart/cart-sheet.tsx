'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from './cart-provider'
import { formatCurrency } from '@/lib/format'

export function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Abrir carrinho com ${totalItems} itens`}
        />}
      >
        <ShoppingBag className="size-5" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Seu carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">
              Seu carrinho está vazio. Que tal um mel silvestre?
            </p>
            <Button
              render={<Link href="/produtos" />}
              onClick={() => setOpen(false)}
            >
              Ver produtos
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={item.product.image || '/placeholder.svg'}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="text-sm font-semibold leading-tight">
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Remover ${item.product.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.product.price)}
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="flex items-center rounded-md border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="grid size-7 place-items-center text-muted-foreground hover:text-foreground"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="grid size-7 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
                          disabled={item.quantity >= item.product.stock}
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="ml-auto text-sm font-semibold">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />
            <SheetFooter className="gap-3">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-serif text-lg font-semibold">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <Button
                render={<Link href="/carrinho" />}
                size="lg"
                onClick={() => setOpen(false)}
              >
                Finalizar pedido
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
