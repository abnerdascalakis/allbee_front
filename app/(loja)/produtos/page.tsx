import { ProductCatalog } from '@/components/product/product-catalog'
import { obterProdutos, obterCategorias } from '@/lib/data'

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const [produtos, categorias] = await Promise.all([obterProdutos(), obterCategorias()])
  const categoriaInicial = categorias.find((item) => String(item.id) === categoria)?.id ?? 'todos'

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

      <ProductCatalog key={categoriaInicial} categorias={categorias} produtos={produtos} categoriaInicial={categoriaInicial} />
    </div>
  )
}
