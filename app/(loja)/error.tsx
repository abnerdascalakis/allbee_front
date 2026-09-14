'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p>Não foi possível carregar a loja. Tente novamente em instantes.</p>
      <button className="mt-4 underline" onClick={() => reset()}>Tentar novamente</button>
    </div>
  )
}
