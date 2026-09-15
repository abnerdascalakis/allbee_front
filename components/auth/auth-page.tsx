import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

import { Logo } from '@/components/logo'
import { AuthForm } from '@/components/auth/auth-form'

export function AuthPage({ modo, destino }: { modo: 'login' | 'cadastro'; destino?: string }) {
  const criando = modo === 'cadastro'
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-foreground lg:flex lg:flex-col lg:justify-between">
        <Image
          src="/images/hero-colmeia-por-do-sol.png"
          alt="Colmeia em um campo florido ao pôr do sol"
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24180b]/95 via-[#38250e]/50 to-[#38250e]/10" />

        <div className="relative z-10 p-10 xl:p-14">
          <Logo className="w-fit rounded-xl bg-background/90 px-3 py-2 shadow-sm backdrop-blur" />
        </div>

        <div className="relative z-10 max-w-2xl p-10 text-white xl:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
            <Check className="size-3.5 text-primary" />
            Direto do apiário
          </span>
          <h2 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight xl:text-5xl">
            Da nossa colmeia para a sua mesa.
          </h2>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-white/75">
            Entre para acompanhar seus pedidos e descobrir produtos feitos com
            cuidado, respeito às abelhas e o sabor verdadeiro do campo.
          </p>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 size-72 rounded-full bg-accent/40 blur-3xl"
        />

        <div className="relative w-full max-w-md">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <Logo />
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Início
            </Link>
          </div>

          <Link
            href="/"
            className="mb-10 hidden w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            <ArrowLeft className="size-4" />
            Voltar para a loja
          </Link>

          <div>
            <p className="mb-2 text-sm font-semibold text-primary">{criando ? 'Faça parte da nossa colmeia' : 'Bem-vindo de volta'}</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight">
              {criando ? 'Crie sua conta' : 'Entre na sua conta'}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {criando ? 'Preencha seus dados para começar a comprar com a AllBee.' : 'Use seu e-mail e senha para continuar.'}
            </p>
          </div>

          <AuthForm modo={modo} destino={destino} />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {criando ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}{' '}
            <Link href={`${criando ? '/auth/login' : '/auth/cadastro'}${destino ? '?next=/checkout' : ''}`} className="font-semibold text-primary hover:underline">
              {criando ? 'Entrar' : 'Criar conta'}
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
