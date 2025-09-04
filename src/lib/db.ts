// src/lib/db.ts (Updated version without better-sqlite3)
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../../drizzle/schema';

const client = createClient({
  url: 'file:local.db'
});

export const db = drizzle(client, { schema });

// drizzle.config.ts (Updated)
import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:local.db',
  },
} satisfies Config;