'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cadastro, ErroApi, login } from '@/lib/data'
import { COOKIE_SESSAO } from '@/lib/session'

export async function autenticar(
  modo: 'login' | 'cadastro',
  _estado: { erro: string },
  form: FormData,
) {
  const email = String(form.get('email') ?? '').trim()
  const password = String(form.get('password') ?? '')
  const nome = String(form.get('nome') ?? '').trim()
  const password_confirmation = String(form.get('password_confirmation') ?? '')

  if (modo !== 'login' && modo !== 'cadastro') return { erro: 'Operação inválida.' }
  if (!email || !password) return { erro: 'Informe seu e-mail e senha.' }
  if (modo === 'cadastro') {
    if (!nome) return { erro: 'Informe seu nome.' }
    if (password.length < 8) return { erro: 'A senha deve ter pelo menos 8 caracteres.' }
    if (password !== password_confirmation) return { erro: 'As senhas não coincidem.' }
  }

  let resposta
  try {
    resposta = modo === 'cadastro'
      ? await cadastro({ nome, email, password, password_confirmation })
      : await login({ email, password })
  } catch (erro) {
    return {
      erro: erro instanceof ErroApi && erro.status < 500
        ? erro.message
        : 'Não foi possível conectar ao serviço. Tente novamente em instantes.',
    }
  }

  const lembrar = form.get('remember') === 'on'
  ;(await cookies()).set(COOKIE_SESSAO, resposta.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(lembrar ? { maxAge: 6 * 60 * 60 } : {}),
  })
  if (form.get('next') === '/checkout') redirect('/checkout')
  redirect(resposta.usuario.role === 'admin' ? '/admin' : '/')
}

export async function encerrarSessao() {
  ;(await cookies()).delete(COOKIE_SESSAO)
  redirect('/auth/login')
}
