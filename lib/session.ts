import { cache } from 'react'
import { cookies } from 'next/headers'
import { ErroApi, obterPerfil } from './data'

export const COOKIE_SESSAO = 'allbee_session'

export const obterUsuarioAtual = cache(async () => {
  const token = (await cookies()).get(COOKIE_SESSAO)?.value
  if (!token) return null

  try {
    return await obterPerfil(token)
  } catch (erro) {
    if (erro instanceof ErroApi && erro.status === 401) return null
    throw erro
  }
})
