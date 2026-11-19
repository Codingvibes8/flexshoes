import { config } from "dotenv"

config({ path: ".env.local" })

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import { products as catalog } from "../products"
import { categories, products } from "./schema"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add your Neon connection string to .env.local before seeding.",
  )
}

const db = drizzle(neon(connectionString), { schema: { categories, products } })

const categorySeed = [
  {
    name: "Sneakers",
    slug: "sneakers",
    description: "Everyday street style and iconic silhouettes.",
    imageUrl: "/white-sneakers.jpg",
  },
  {
    name: "Running",
    slug: "running",
    description: "Lightweight performance shoes built for the miles.",
    imageUrl: "/trail-running.jpg",
  },
  {
    name: "Boots",
    slug: "boots",
    description: "Rugged leather boots made to last through every season.",
    imageUrl: "/red-wing-iron-ranger.jpg",
  },
  {
    name: "Formal",
    slug: "formal",
    description: "Polished dress shoes for work, weddings, and evenings out.",
    imageUrl: "/johnston-murphy.jpg",
  },
  {
    name: "Sandals",
    slug: "sandals",
    description: "Breathable, adventure-ready sandals for warmer days.",
    imageUrl: "/comfort-walk.jpg",
  },
  {
    name: "Casual",
    slug: "casual",
    description: "Easy-going pairs that go with everything you own.",
    imageUrl: "/urban-walker.jpg",
  },
]

const imageByName: Record<string, string> = {
  "Nike Air Max 270 Men's": "/basketball.jpg",
  "Adidas Originals Forum Low": "/white-sneakers.jpg",
  "New Balance FuelCell Rebel v4": "/trail-running.jpg",
  "Red Wing Iron Ranger Boot": "/red-wing-iron-ranger.jpg",
  "Johnston & Murphy Melton Oxford": "/johnston-murphy.jpg",
  "Teva Hurricane XLT2": "/comfort-walk.jpg",
  "Clarks Desert Trek": "/urban-walker.jpg",
}

const knownBrands = [
  "New Balance",
  "Johnston & Murphy",
  "Red Wing",
  "Nike",
  "Adidas",
  "Teva",
  "Clarks",
]

function brandFor(name: string) {
  return (
    knownBrands.find((brand) => name.toLowerCase().startsWith(brand.toLowerCase())) ??
    name.split(" ")[0]
  )
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

async function seed() {
  await db
    .insert(categories)
    .values(categorySeed)
    .onConflictDoNothing({ target: categories.slug })

  const existing = await db.select({ id: products.id }).from(products).limit(1)

  if (existing.length > 0) {
    console.log("Products already exist - skipping product seed.")
    return
  }

  const productRows = catalog.map((product) => ({
    name: product.name,
    description: product.description,
    price: Number(product.price),
    imageUrl: imageByName[product.name] ?? product.image[0] ?? "/placeholder.jpg",
    category: titleCase(product.subcategory),
    brand: brandFor(product.name),
    sizes: product.sizes,
    colors: product.colors,
    stock: product.stock,
    featured: product.featured ?? false,
    salePrice: null,
  }))

  await db.insert(products).values(productRows)

  console.log(
    `Seeded ${categorySeed.length} categories and ${productRows.length} products.`,
  )
}

seed().catch((error) => {
  console.error("Seed failed:", error)
  process.exitCode = 1
})
