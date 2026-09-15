'use server'

import { cookies } from 'next/headers'
import { COOKIE_SESSAO } from '@/lib/session'
import { criarPedido, ErroApi } from '@/lib/data'
import { camposEntrega, type DadosPedido, type PedidoCriado } from '@/lib/checkout'

export async function finalizarPedido(form: FormData): Promise<{ erro?: string; pedido?: PedidoCriado }> {
  const token = (await cookies()).get(COOKIE_SESSAO)?.value
  if (!token) return { erro: 'Entre na sua conta para finalizar o pedido.' }

  const entrega = Object.fromEntries(camposEntrega.map(({ name }) => [name, String(form.get(name) ?? '').trim()])) as DadosPedido['entrega']
  if (camposEntrega.some(({ name, required }) => required && !entrega[name])) {
    return { erro: 'Preencha os campos obrigatórios do endereço.' }
  }
  if (!/^\d{5}-?\d{3}$/.test(entrega.cep)) return { erro: 'Informe um CEP válido com 8 dígitos.' }
  let itens: DadosPedido['itens']
  try {
    const valor: unknown = JSON.parse(String(form.get('itens') ?? ''))
    if (!Array.isArray(valor) || !valor.length || valor.length > 100 || valor.some(item =>
      !item || !Number.isSafeInteger(item.produto_id) || item.produto_id <= 0 ||
      !Number.isSafeInteger(item.quantidade) || item.quantidade <= 0,
    )) return { erro: 'Os itens do carrinho são inválidos.' }
    itens = valor.map(({ produto_id, quantidade }) => ({ produto_id, quantidade }))
    if (new Set(itens.map(item => item.produto_id)).size !== itens.length) return { erro: 'Existem produtos repetidos no carrinho.' }
  } catch { return { erro: 'Não foi possível ler os itens do carrinho.' } }

  try {
    const pedido = await criarPedido(token, { entrega, itens })
    if (!Number.isSafeInteger(pedido.id) || pedido.id <= 0 || !Number.isSafeInteger(pedido.total_centavos) || pedido.total_centavos < 0 || typeof pedido.status !== 'string') {
      return { erro: 'O serviço retornou uma confirmação inválida. Confira seus pedidos antes de tentar novamente.' }
    }
    return { pedido }
  } catch (erro) {
    if (erro instanceof ErroApi) {
      if (erro.status === 404) return { erro: 'A finalização de pedidos ainda não está disponível. Seu carrinho foi mantido.' }
      if (erro.status === 401) return { erro: 'Sua sessão expirou. Entre novamente para finalizar.' }
      if (erro.status < 500) return { erro: erro.message }
    }
    return { erro: 'Não foi possível confirmar o pedido. Confira se ele foi registrado antes de tentar novamente.' }
  }
}
