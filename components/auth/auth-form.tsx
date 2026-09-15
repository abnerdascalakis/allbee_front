'use client'

import { useActionState } from 'react'
import { Loader2, LockKeyhole, Mail, User } from 'lucide-react'
import { autenticar } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthForm({ modo, destino }: { modo: 'login' | 'cadastro'; destino?: string }) {
  const criando = modo === 'cadastro'
  const [estado, action, pendente] = useActionState(autenticar.bind(null, modo), { erro: '' })
  const campos = [
    ...(criando ? [{ name: 'nome', label: 'Nome completo', type: 'text', autoComplete: 'name', placeholder: 'Seu nome completo', icon: User }] : []),
    { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', placeholder: 'voce@exemplo.com', icon: Mail },
    { name: 'password', label: 'Senha', type: 'password', autoComplete: criando ? 'new-password' : 'current-password', placeholder: criando ? 'Pelo menos 8 caracteres' : 'Digite sua senha', icon: LockKeyhole },
    ...(criando ? [{ name: 'password_confirmation', label: 'Confirmar senha', type: 'password', autoComplete: 'new-password', placeholder: 'Repita sua senha', icon: LockKeyhole }] : []),
  ]

  return (
    <form action={action} className="mt-8 space-y-5" aria-busy={pendente}>
      <input type="hidden" name="next" value={destino ?? ""} />
      <fieldset disabled={pendente} className="space-y-5">
        {campos.map(({ name, label, icon: Icon, ...props }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <div className="relative">
              <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input {...props} id={name} name={name} required
                minLength={criando && props.type === 'password' ? 8 : undefined}
                className="h-11 bg-card pl-10 shadow-xs" />
            </div>
          </div>
        ))}
        {!criando && (
          <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
            <input type="checkbox" name="remember" className="size-4 rounded border-input accent-primary" />
            Lembrar de mim
          </label>
        )}
        {estado.erro && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{estado.erro}</p>}
        <Button type="submit" disabled={pendente} size="lg" className="h-11 w-full text-sm font-semibold">
          {pendente && <Loader2 className="size-4 animate-spin" />}
          {pendente ? (criando ? 'Criando conta…' : 'Entrando…') : (criando ? 'Criar conta' : 'Entrar')}
        </Button>
      </fieldset>
    </form>
  )
}
