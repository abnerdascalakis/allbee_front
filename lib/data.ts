import type { Produto } from './types'

export const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Mel Silvestre',
    slug: 'mel-silvestre',
    descricaoCurta: 'Mel cru de florada silvestre, puro e artesanal.',
    preco: 39.9,
    estoque: 20,
    categoria: 'mel',
    imagem: '/images/produto-mel-silvestre.png',
    destaque: true,
  },
  {
    id: '2',
    nome: 'Favo de Mel',
    slug: 'favo-de-mel',
    descricaoCurta: 'Favo natural preservado diretamente da colmeia.',
    preco: 49.9,
    estoque: 12,
    categoria: 'favo',
    imagem: '/images/produto-favo.png',
    destaque: true,
  },
  {
    id: '3',
    nome: 'Extrato de Própolis',
    slug: 'extrato-de-propolis',
    descricaoCurta: 'Extrato artesanal concentrado de própolis.',
    preco: 29.9,
    estoque: 30,
    categoria: 'propolis',
    imagem: '/images/produto-propolis.png',
    destaque: true,
  },
  {
    id: '4',
    nome: 'Geleia Real',
    slug: 'geleia-real',
    descricaoCurta: 'Geleia real fresca, cuidadosamente selecionada.',
    preco: 59.9,
    estoque: 8,
    categoria: 'geleia-real',
    imagem: '/images/produto-geleia-real.png',
    destaque: true,
  },
  {
    id: '5',
    nome: 'Vela de Cera de Abelha',
    slug: 'vela-de-cera-de-abelha',
    descricaoCurta: 'Vela artesanal feita com cera pura de abelha.',
    preco: 24.9,
    estoque: 16,
    categoria: 'velas',
    imagem: '/images/produto-vela-cera.png',
  },
]

export function obterProdutosEmDestaque() {
  return produtos.filter((produto) => produto.destaque)
}
