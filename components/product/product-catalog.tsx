'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from './product-card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CATEGORY_LABELS, type Category, type Product } from '@/lib/types'

type Filter = Category | 'todos'

const filters: { key: Filter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'mel', label: CATEGORY_LABELS.mel },
  { key: 'favo', label: CATEGORY_LABELS.favo },
  { key: 'propolis', label: CATEGORY_LABELS.propolis },
  { key: 'geleia-real', label: CATEGORY_LABELS['geleia-real'] },
  { key: 'velas', label: CATEGORY_LABELS.velas },
]

export function ProductCatalog({
  products,
  initialCategory = 'todos',
}: {
  products: Product[]
  initialCategory?: Filter
}) {
  const [active, setActive] = useState<Filter>(initialCategory)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = active === 'todos' || p.category === active
      const matchQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      return matchCategory && matchQuery
    })
  }, [products, active, query])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                active === f.key
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produtos..."
            className="pl-9"
            aria-label="Buscar produtos"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
