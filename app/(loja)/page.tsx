import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, ShieldCheck, Sprout, Truck } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { Reveal } from '@/components/motion/reveal'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { getFeaturedProducts } from '@/lib/data'
import { CATEGORY_LABELS, type Category } from '@/lib/types'

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

const categories: { key: Category; image: string }[] = [
  { key: 'mel', image: '/images/produto-mel-silvestre.png' },
  { key: 'favo', image: '/images/produto-favo.png' },
  { key: 'propolis', image: '/images/produto-propolis.png' },
  { key: 'geleia-real', image: '/images/produto-geleia-real.png' },
  { key: 'velas', image: '/images/produto-vela-cera.png' },
]

export default function HomePage() {
  const featured = getFeaturedProducts()

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
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
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
          {categories.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.06}>
              <Link
                href={`/produtos?categoria=${cat.key}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl border"
              >
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={CATEGORY_LABELS[cat.key]}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                <span className="relative p-4 font-serif text-lg font-semibold">
                  {CATEGORY_LABELS[cat.key]}
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
              Há mais de 20 anos cuidamos de colmeias na Serra da Mantiqueira,
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
