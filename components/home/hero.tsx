'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      {/* Fundo: colmeia ao pôr do sol com leve zoom contínuo */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.12 }}
        animate={reduce ? { scale: 1.12 } : { scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <Image
          src="/images/hero-colmeia-por-do-sol.png"
          alt="Caixa de abelhas em um campo de flores silvestres ao pôr do sol"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Camadas de leitura sobre a imagem */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-transparent to-background/40" />

      {/* Abelha voando até a colmeia (posicionada na entrada da caixa) */}
      <motion.div
        className="pointer-events-none absolute left-[34%] top-[58%] -z-10 md:z-0"
        initial={
          reduce
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: 520, y: -280, rotate: 10, scale: 0.5 }
        }
        animate={
          reduce
            ? { opacity: 1, x: 0, y: 0 }
            : {
                opacity: [0, 1, 1, 1, 1],
                x: [520, 240, 280, 90, 0],
                y: [-280, -130, -30, -70, 0],
                rotate: [10, -8, 7, -4, 0],
                scale: [0.5, 0.85, 0.92, 0.96, 1],
              }
        }
        transition={{ duration: 6, ease: 'easeInOut', times: [0, 0.32, 0.58, 0.82, 1] }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <Image
            src="/images/abelha.png"
            alt=""
            aria-hidden="true"
            width={110}
            height={110}
            className="size-16 -scale-x-100 drop-shadow-[0_8px_14px_rgba(60,40,0,0.35)] md:size-24"
          />
        </motion.div>
      </motion.div>

      {/* Conteúdo */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          className="max-w-xl md:ml-auto md:text-right"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
            Direto do apiário
          </span>
          <h1 className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Mel puro, do jeito que a natureza fez
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:ml-auto md:max-w-md">
            Méis, favos, própolis e produtos da colmeia colhidos com respeito às
            abelhas. Sem aditivos, sem aquecimento — só o sabor do campo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:justify-end">
            <Button render={<Link href="/produtos" />} size="lg">
              Ver produtos
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="/sobre" />}
              size="lg"
              variant="outline"
              className="bg-background/50 backdrop-blur"
            >
              Nossa história
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
