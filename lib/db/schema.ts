import { sql } from "drizzle-orm"
import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export type ShippingAddress = {
  line1: string
  line2?: string
  city: string
  region?: string
  postalCode: string
  country: string
}

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: doublePrecision("price").notNull(),
    imageUrl: text("image_url").notNull(),
    category: text("category").notNull(),
    brand: text("brand").notNull().default(""),
    sizes: text("sizes").array().notNull().default(sql`'{}'::text[]`),
    colors: text("colors").array().notNull().default(sql`'{}'::text[]`),
    stock: integer("stock").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    salePrice: doublePrecision("sale_price"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("products_category_idx").on(table.category),
    index("products_featured_idx").on(table.featured),
  ],
)

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Clerk user id (for example "user_2abc..."). Clerk owns the users table.
    userId: text("user_id").notNull(),
    totalAmount: doublePrecision("total_amount").notNull(),
    status: text("status").notNull().default("pending"),
    shippingAddress: jsonb("shipping_address").$type<ShippingAddress>(),
    // Stripe identifiers. The session id is unique so webhooks and the
    // success page can record the same payment only once.
    stripeSessionId: text("stripe_session_id").unique(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("orders_user_id_idx").on(table.userId)],
)
