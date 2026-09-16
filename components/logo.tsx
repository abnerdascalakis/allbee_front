import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary', className)}
      aria-label="Allbee - página inicial"
    >
      <Image
        src="/images/allbee-mark.svg"
        alt=""
        width={44}
        height={44}
        className="size-11 shrink-0"
        unoptimized
      />
      <span className="font-sans text-2xl font-extrabold leading-none tracking-tight">
        All
        <span className="text-primary">bee</span>
      </span>
    </Link>
  )
}
