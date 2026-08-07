import type { Product } from './types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Mel Silvestre',
    slug: 'mel-silvestre',
    shortDescription: 'Mel cru de florada silvestre, puro e artesanal.',
    price: 39.9,
    stock: 20,
    category: 'mel',
    image: '/images/produto-mel-silvestre.png',
    featured: true,
  },
  {
    id: '2',
    name: 'Favo de Mel',
    slug: 'favo-de-mel',
    shortDescription: 'Favo natural preservado diretamente da colmeia.',
    price: 49.9,
    stock: 12,
    category: 'favo',
    image: '/images/produto-favo.png',
    featured: true,
  },
  {
    id: '3',
    name: 'Extrato de Própolis',
    slug: 'extrato-de-propolis',
    shortDescription: 'Extrato artesanal concentrado de própolis.',
    price: 29.9,
    stock: 30,
    category: 'propolis',
    image: '/images/produto-propolis.png',
    featured: true,
  },
  {
    id: '4',
    name: 'Geleia Real',
    slug: 'geleia-real',
    shortDescription: 'Geleia real fresca, cuidadosamente selecionada.',
    price: 59.9,
    stock: 8,
    category: 'geleia-real',
    image: '/images/produto-geleia-real.png',
    featured: true,
  },
  {
    id: '5',
    name: 'Vela de Cera de Abelha',
    slug: 'vela-de-cera-de-abelha',
    shortDescription: 'Vela artesanal feita com cera pura de abelha.',
    price: 24.9,
    stock: 16,
    category: 'velas',
    image: '/images/produto-vela-cera.png',
  },
]

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}
