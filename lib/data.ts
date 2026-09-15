import { notFound } from 'next/navigation'
import type {
  Categoria,
  DadosCadastro,
  DadosLogin,
  Produto,
  RespostaAutenticacao,
  Usuario,
} from './types'

const apiUrl = process.env.API_URL || 'http://localhost:3000/api/v1'

export class ErroApi extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ErroApi'
  }
}

async function consultar<T>(rota: string, opcoes: RequestInit = {}): Promise<T> {
  const resposta = await fetch(`${apiUrl.replace(/\/$/, '')}/${rota}`, {
    ...opcoes,
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  if (resposta.status === 404 && rota.startsWith('produtos/')) notFound()
  if (!resposta.ok) {
    const corpo: unknown = await resposta.json().catch(() => null)
    let mensagem = `Falha ao consultar ${rota}: HTTP ${resposta.status}`

    if (corpo && typeof corpo === 'object') {
      if ('erro' in corpo && typeof corpo.erro === 'string') {
        mensagem = corpo.erro
      } else if ('erros' in corpo && Array.isArray(corpo.erros)) {
        const erros = corpo.erros.filter((erro): erro is string => typeof erro === 'string')
        if (erros.length) mensagem = erros.join('; ')
      }
    }

    throw new ErroApi(mensagem, resposta.status)
  }
  return resposta.json()
}

export function obterProdutos() {
  return consultar<Produto[]>('produtos')
}

export function obterCategorias() {
  return consultar<Categoria[]>('categorias')
}

export function obterProduto(id: string) {
  return consultar<Produto>(`produtos/${encodeURIComponent(id)}`)
}

export function login(dados: DadosLogin) {
  return consultar<RespostaAutenticacao>('login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: dados.email, password: dados.password }),
  })
}

export function obterPerfil(token: string) {
  return consultar<Usuario>('perfil', {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function cadastro(dados: DadosCadastro) {
  return consultar<RespostaAutenticacao>('cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario: {
        nome: dados.nome,
        email: dados.email,
        password: dados.password,
        password_confirmation: dados.password_confirmation,
      },
    }),
  })
}

export function criarPedido(token: string, dados: import('./checkout').DadosPedido) {
  return consultar<import('./checkout').PedidoCriado>('pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ pedido: { ...dados.entrega, itens: dados.itens } }),
  })
}
