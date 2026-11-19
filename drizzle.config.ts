import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add your Neon connection string to .env.local before running Drizzle commands.",
  )
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  strict: true,
  verbose: true,
})
