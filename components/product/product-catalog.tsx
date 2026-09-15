'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from './product-card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { type Categoria, type Produto } from '@/lib/types'

type Filtro = number | 'todos'

export function ProductCatalog({
  produtos,
  categorias,
  categoriaInicial = 'todos',
}: {
  produtos: Produto[]
  categorias: Categoria[]
  categoriaInicial?: Filtro
}) {
  const filtros: { key: Filtro; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    ...categorias.map((categoria) => ({ key: categoria.id, label: categoria.nome })),
  ]
  const [ativo, setAtivo] = useState<Filtro>(categoriaInicial)
  const [query, setQuery] = useState('')

  const filtrados = useMemo(() => {
    return produtos.filter((produto) => {
      const correspondeCategoria = ativo === 'todos' || produto.categoria_id === ativo
      const correspondeBusca =
        query.trim() === '' ||
        produto.nome.toLowerCase().includes(query.toLowerCase()) ||
        (produto.descricao || '').toLowerCase().includes(query.toLowerCase())
      return correspondeCategoria && correspondeBusca
    })
  }, [produtos, ativo, query])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f.key}
              onClick={() => setAtivo(f.key)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                ativo === f.key
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

      {filtrados.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filtrados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} categoria={categorias.find((categoria) => categoria.id === produto.categoria_id)} />
          ))}
        </div>
      )}
    </div>
  )
}
