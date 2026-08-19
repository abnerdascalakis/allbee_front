import Link from 'next/link'
import { Camera, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Mel puro e produtos da colmeia colhidos com respeito às abelhas e à
            natureza. Do apiário direto para a sua mesa.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Navegação</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/produtos" className="hover:text-foreground">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-foreground">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-foreground">
                Minha Conta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Contato</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              Serra da Mantiqueira, MG
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              (35) 99999-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              contato@colmeiadourada.com.br
            </li>
            <li className="flex items-center gap-2">
              <Camera className="size-4 shrink-0" />
              @colmeiadourada
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Colmeia Dourada. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
