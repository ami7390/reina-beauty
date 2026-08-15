import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb(db?: D1Database) {
  if (!db) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable on this runtime."
    );
  }

  return drizzle(db, { schema });
}
