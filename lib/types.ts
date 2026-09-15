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
  categoria_id: number
}

export interface Usuario {
  id: number
  nome: string
  email: string
  role: 'cliente' | 'admin'
  created_at?: string
}

export interface DadosLogin {
  email: string
  password: string
}

export interface DadosCadastro extends DadosLogin {
  nome: string
  password_confirmation: string
}

export interface RespostaAutenticacao {
  usuario: Usuario
  token: string
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}
