import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:local.db',
  },
} satisfies Config;