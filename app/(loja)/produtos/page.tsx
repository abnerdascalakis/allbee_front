import { ProductCatalog } from '@/components/product/product-catalog'
import { produtos } from '@/lib/data'
import type { Categoria } from '@/lib/types'

const categoriasValidas: Categoria[] = [
  'mel',
  'favo',
  'propolis',
  'geleia-real',
  'velas',
]

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const categoriaInicial =
    categoria && categoriasValidas.includes(categoria as Categoria)
      ? (categoria as Categoria)
      : 'todos'

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Nossa loja
        </p>
        <h1 className="mt-1 font-serif text-4xl font-semibold">Produtos</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Mel e derivados colhidos artesanalmente. Escolha seus favoritos e
          receba em casa.
        </p>
      </header>

      <ProductCatalog produtos={produtos} categoriaInicial={categoriaInicial} />
    </div>
  )
}
