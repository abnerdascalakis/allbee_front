export interface Categoria {
  id: number
  nome: string
}

export interface Produto {
  id: number
  nome: string
  descricao: string | null
  preco: string
  estoque: number
  categoria_id: number | null
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}
