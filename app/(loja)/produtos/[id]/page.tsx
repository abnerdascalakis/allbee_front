import Link from 'next/link'
import { notFound } from 'next/navigation'
import { obterProduto, obterCategorias } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^\d+$/.test(id)) notFound()
  const [produto, categorias] = await Promise.all([obterProduto(id), obterCategorias()])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link href="/produtos" className="underline">Voltar aos produtos</Link>
      <h1 className="my-6 font-serif text-4xl font-semibold">{produto.nome}</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductCard produto={produto} categoria={categorias.find((categoria) => categoria.id === produto.categoria_id)} />
        <p className="whitespace-pre-line text-muted-foreground">{produto.descricao}</p>
      </div>
    </div>
  )
}
