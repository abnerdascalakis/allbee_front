import { notFound } from 'next/navigation'
import type { Categoria, Produto } from './types'

const apiUrl = process.env.API_URL || 'http://localhost:3000/api/v1'

async function consultar<T>(rota: string): Promise<T> {
  const resposta = await fetch(`${apiUrl.replace(/\/$/, '')}/${rota}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  if (resposta.status === 404 && rota.startsWith('produtos/')) notFound()
  if (!resposta.ok) {
    throw new Error(`Falha ao consultar ${rota}: HTTP ${resposta.status}`)
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
