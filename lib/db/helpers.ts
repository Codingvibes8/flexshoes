import { and, asc, desc, eq, ilike, isNotNull, or } from "drizzle-orm"
import type { SQL } from "drizzle-orm"

import { db } from "./index"
import { categories, orders, products } from "./schema"
import type {
  Category,
  Order,
  Product,
  ProductCategory,
  ProductFilters,
} from "./types"

export type DbResult<T> = { data: T; error: null } | { data: null; error: Error }

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

function buildProductFilter(filters?: ProductFilters): SQL | undefined {
  const conditions: SQL[] = []

  if (filters?.category) {
    conditions.push(eq(products.category, filters.category))
  }

  if (filters?.featured !== undefined) {
    conditions.push(eq(products.featured, filters.featured))
  }

  if (filters?.search?.trim()) {
    const term = `%${filters.search.trim()}%`
    conditions.push(
      or(
        ilike(products.name, term),
        ilike(products.description, term),
        ilike(products.brand, term),
      ) as SQL,
    )
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}

async function getProducts(filters?: ProductFilters): Promise<DbResult<Product[]>> {
  try {
    let query = db
      .select()
      .from(products)
      .where(buildProductFilter(filters))
      .orderBy(desc(products.createdAt))
      .$dynamic()

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.offset(filters.offset)
    }

    return { data: await query, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

async function getProductById(id: string): Promise<DbResult<Product | null>> {
  try {
    if (!UUID_PATTERN.test(id)) {
      return { data: null, error: null }
    }

    const rows = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    return { data: rows[0] ?? null, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

async function getFeaturedProducts(limit = 8): Promise<DbResult<Product[]>> {
  return getProducts({ featured: true, limit })
}

async function getProductsByCategory(
  category: ProductCategory | string,
  limit?: number,
): Promise<DbResult<Product[]>> {
  return getProducts({ category, limit })
}

async function getSaleProducts(limit?: number): Promise<DbResult<Product[]>> {
  try {
    let query = db
      .select()
      .from(products)
      .where(isNotNull(products.salePrice))
      .orderBy(desc(products.createdAt))
      .$dynamic()

    if (limit) {
      query = query.limit(limit)
    }

    return { data: await query, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

async function getCategories(): Promise<DbResult<Category[]>> {
  try {
    const data = await db.select().from(categories).orderBy(asc(categories.name))
    return { data, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

async function getCategoryBySlug(slug: string): Promise<DbResult<Category | null>> {
  try {
    const rows = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1)

    return { data: rows[0] ?? null, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

async function searchProducts(
  searchTerm: string,
  limit = 20,
): Promise<DbResult<Product[]>> {
  return getProducts({ search: searchTerm, limit })
}

async function getOrdersByUserId(
  userId: string,
  limit = 20,
): Promise<DbResult<Order[]>> {
  try {
    const data = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt))
      .limit(limit)

    return { data, error: null }
  } catch (error) {
    return { data: null, error: toError(error) }
  }
}

export const dbHelpers = {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  getSaleProducts,
  getCategories,
  getCategoryBySlug,
  searchProducts,
  getOrdersByUserId,
}
