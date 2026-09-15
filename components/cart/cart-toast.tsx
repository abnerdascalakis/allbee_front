'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function mostrarAvisoCarrinho(description: string) {
  const id = toast.success('Adicionado ao carrinho', {
    description,
    duration: 15_000,
    closeButton: true,
    action: (
      <Button
        size="sm"
        render={<Link href="/checkout" />}
        onClick={() => toast.dismiss(id)}
      >
        Finalizar compra
      </Button>
    ),
  })
}
