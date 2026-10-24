import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "@/db/schema"

const connection = process.env.DATABASE_URL
// Lazy failure keeps static demo routes independent of external infrastructure.
export const db = connection
  ? drizzle(neon(connection), { schema })
  : new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
      get() {
        throw new Error(
          "Database is not configured. Use the local demo booking flow."
        )
      },
    })
