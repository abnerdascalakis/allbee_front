import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, LockKeyhole, Mail } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
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
            <p className="mb-2 text-sm font-semibold text-primary">Bem-vindo de volta</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight">
              Entre na sua conta
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Use seu e-mail e senha para continuar.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  required
                  className="h-11 bg-card pl-10 shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/auth/recuperar-senha"
                  className="text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  required
                  minLength={6}
                  className="h-11 bg-card pl-10 shadow-xs"
                />
              </div>
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="remember"
                className="size-4 rounded border-input accent-primary"
              />
              Lembrar de mim
            </label>

            <Button type="submit" size="lg" className="h-11 w-full text-sm font-semibold">
              Entrar
            </Button>
          </form>

          <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            ou continue com
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button type="button" variant="outline" size="lg" className="h-11 w-full bg-card">
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.32 2.98-7.42Z" />
              <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.55c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.63A10 10 0 0 0 12 22Z" />
              <path fill="#FBBC05" d="M6.39 13.85A6 6 0 0 1 6.08 12c0-.64.11-1.26.31-1.85V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.48l3.35-2.63Z" />
              <path fill="#EA4335" d="M12 6.02c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.63C7.18 7.78 9.39 6.02 12 6.02Z" />
            </svg>
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{' '}
            <Link href="/auth/cadastro" className="font-semibold text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
