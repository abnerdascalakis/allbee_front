export type Categoria = 'mel' | 'favo' | 'propolis' | 'geleia-real' | 'velas'

export interface Produto {
  id: string
  nome: string
  slug: string
  descricaoCurta: string
  preco: number
  estoque: number
  categoria: Categoria
  imagem: string
  destaque?: boolean
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

export const ROTULOS_CATEGORIAS: Record<Categoria, string> = {
  mel: 'Mel',
  favo: 'Favo',
  propolis: 'Própolis',
  'geleia-real': 'Geleia real',
  velas: 'Velas',
}
