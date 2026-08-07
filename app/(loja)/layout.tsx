import { SiteHeader } from '@/components/navbar'
import { SiteFooter } from '@/components/footer'

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
