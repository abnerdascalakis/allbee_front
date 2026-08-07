import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-serif', className)}
      aria-label="Colmeia Dourada - página inicial"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2 3 7v10l9 5 9-5V7z" />
          <path d="M12 8v8M8 6v8M16 6v8" />
        </svg>
      </span>
      <span className="text-lg font-semibold leading-none tracking-tight">
        Colmeia
        <span className="text-primary"> Dourada</span>
      </span>
    </Link>
  )
}
