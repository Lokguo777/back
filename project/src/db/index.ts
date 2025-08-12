import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/config/env';
import * as schema from './schema';

// Create PostgreSQL connection
const client = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create Drizzle database instance
export const db = drizzle(client, { schema });

// Export schema for migrations
export * from './schema'; 