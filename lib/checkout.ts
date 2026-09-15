export const camposEntrega = [
  { name: 'nome_destinatario', label: 'Nome do destinatário', autoComplete: 'name', required: true },
  { name: 'telefone_destinatario', label: 'Telefone', autoComplete: 'tel', required: false },
  { name: 'cep', label: 'CEP', autoComplete: 'postal-code', required: true },
  { name: 'logradouro', label: 'Rua / avenida', autoComplete: 'address-line1', required: true },
  { name: 'numero', label: 'Número', autoComplete: 'off', required: true },
  { name: 'complemento', label: 'Complemento', autoComplete: 'address-line2', required: false },
  { name: 'bairro', label: 'Bairro', autoComplete: 'off', required: true },
  { name: 'cidade', label: 'Cidade', autoComplete: 'address-level2', required: true },
] as const

export interface PedidoCriado {
  id: number
  status: string
  total_centavos: number
}

export interface DadosPedido {
  entrega: Record<(typeof camposEntrega)[number]['name'], string>
  itens: { produto_id: number; quantidade: number }[]
}
