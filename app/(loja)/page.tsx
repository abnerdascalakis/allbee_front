import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, ShieldCheck, Sprout, Truck } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { Reveal } from '@/components/motion/reveal'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { obterProdutosEmDestaque } from '@/lib/data'
import { ROTULOS_CATEGORIAS, type Categoria } from '@/lib/types'

const values = [
  {
    icon: Leaf,
    title: '100% natural',
    text: 'Mel cru, sem aditivos, conservantes ou aquecimento que destrói nutrientes.',
  },
  {
    icon: Sprout,
    title: 'Respeito às abelhas',
    text: 'Manejo responsável que preserva as colmeias e o ecossistema local.',
  },
  {
    icon: ShieldCheck,
    title: 'Origem garantida',
    text: 'Cada lote é rastreável até o apiário onde foi colhido.',
  },
  {
    icon: Truck,
    title: 'Entrega para todo o Brasil',
    text: 'Embalagem segura para o mel chegar perfeito na sua casa.',
  },
]

const categorias: { chave: Categoria; imagem: string }[] = [
  { chave: 'mel', imagem: '/images/produto-mel-silvestre.png' },
  { chave: 'favo', imagem: '/images/produto-favo.png' },
  { chave: 'propolis', imagem: '/images/produto-propolis.png' },
  { chave: 'geleia-real', imagem: '/images/produto-geleia-real.png' },
  { chave: 'velas', imagem: '/images/produto-vela-cera.png' },
]

export default function HomePage() {
  const produtosEmDestaque = obterProdutosEmDestaque()

  return (
    <>
      <Hero />

      {/* Diferenciais */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border bg-card p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <v.icon className="size-5" />
                </span>
                <h3 className="font-serif text-lg font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Seleção especial
            </p>
            <h2 className="mt-1 font-serif text-3xl font-semibold sm:text-4xl">
              Produtos em destaque
            </h2>
          </div>
          <Button
            render={<Link href="/produtos" />}
            variant="ghost"
            className="hidden sm:inline-flex"
          >
            Ver todos
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {produtosEmDestaque.map((produto, i) => (
            <Reveal key={produto.id} delay={i * 0.06}>
              <ProductCard produto={produto} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="mb-8">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Explore por categoria
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {categorias.map((categoria, i) => (
            <Reveal key={categoria.chave} delay={i * 0.06}>
              <Link
                href={`/produtos?categoria=${categoria.chave}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border"
              >
                <Image
                  src={categoria.imagem || '/placeholder.svg'}
                  alt={ROTULOS_CATEGORIAS[categoria.chave]}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                <span className="relative p-4 font-serif text-lg font-semibold">
                  {ROTULOS_CATEGORIAS[categoria.chave]}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sobre em destaque */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border bg-card md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[380px]">
            <Image
              src="/images/sobre-apicultor.png"
              alt="Apicultor cuidando das colmeias no campo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Nossa história
            </p>
            <h2 className="mt-2 text-balance font-serif text-3xl font-semibold sm:text-4xl">
              Uma família dedicada às abelhas
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Há 2 anos cuidamos de colmeias em Rôndonia,
              acreditando que um bom mel nasce do respeito à natureza. Cada pote
              carrega o trabalho paciente das abelhas e o cuidado de quem ama o
              que faz.
            </p>
            <Button render={<Link href="/sobre" />} className="mt-6">
              Conheça o apiário
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
