import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

import type { categories, orders, products } from "./schema"

export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>

export type Category = InferSelectModel<typeof categories>
export type NewCategory = InferInsertModel<typeof categories>

export type Order = InferSelectModel<typeof orders>
export type NewOrder = InferInsertModel<typeof orders>

export type { ShippingAddress } from "./schema"

export enum ProductCategory {
  Sneakers = "Sneakers",
  Running = "Running",
  Boots = "Boots",
  Formal = "Formal",
  Sandals = "Sandals",
  Casual = "Casual",
}

export type ProductFilters = {
  category?: ProductCategory | string
  featured?: boolean
  search?: string
  limit?: number
  offset?: number
}
