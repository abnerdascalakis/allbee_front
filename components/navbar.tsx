'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, LogOut, Menu, User } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './logo'
import { CartSheet } from './cart/cart-sheet'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from './auth/auth-provider'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/sobre', label: 'Sobre Nós' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  pathname === link.href && 'text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <CartSheet />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Minha conta" />
                }
              >
                <User className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <DropdownMenuItem render={<Link href="/admin" />}>
                    <LayoutDashboard className="size-4" />
                    Painel Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              render={<Link href="/login" />}
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Entrar
            </Button>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Abrir menu"
              />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle render={<Logo />} />
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                      pathname === link.href &&
                        'bg-secondary text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Entrar
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
