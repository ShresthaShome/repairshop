import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

if (process.env.NODE_ENV === "development") config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

// logger
// export const db = drizzle(sql, {logger: true})
export const db = drizzle(sql);
