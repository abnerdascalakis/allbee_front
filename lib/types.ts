export type Category = 'mel' | 'favo' | 'propolis' | 'geleia-real' | 'velas'

export interface Product {
  id: string
  name: string
  slug: string
  shortDescription: string
  price: number
  stock: number
  category: Category
  image: string
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export const CATEGORY_LABELS: Record<Category, string> = {
  mel: 'Mel',
  favo: 'Favo',
  propolis: 'Própolis',
  'geleia-real': 'Geleia real',
  velas: 'Velas',
}
