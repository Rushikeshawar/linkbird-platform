// drizzle/schema.ts
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Users table (Better Auth compatible)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).default(false),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Sessions table (Better Auth) - Updated for Better Auth compatibility
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

// Accounts table (Better Auth) - Updated for Better Auth compatibility
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'), // For email/password auth
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Campaigns table
export const campaigns = sqliteTable('campaigns', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status', { enum: ['draft', 'active', 'paused', 'completed'] }).notNull().default('draft'),
  description: text('description'),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Leads table
export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  jobTitle: text('jobTitle'),
  linkedinUrl: text('linkedinUrl'),
  status: text('status', { enum: ['pending', 'contacted', 'responded', 'converted', 'do_not_contact'] }).notNull().default('pending'),
  campaignId: text('campaignId').notNull().references(() => campaigns.id, { onDelete: 'cascade' }),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lastContactedAt: integer('lastContactedAt', { mode: 'timestamp' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Lead interactions table
export const leadInteractions = sqliteTable('leadInteractions', {
  id: text('id').primaryKey(),
  leadId: text('leadId').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['message_sent', 'replied', 'connected', 'viewed_profile'] }).notNull(),
  message: text('message'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(unixepoch())`),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertCampaignSchema = createInsertSchema(campaigns);
export const selectCampaignSchema = createSelectSchema(campaigns);
export const insertLeadSchema = createInsertSchema(leads);
export const selectLeadSchema = createSelectSchema(leads);
export const insertLeadInteractionSchema = createInsertSchema(leadInteractions);
export const selectLeadInteractionSchema = createSelectSchema(leadInteractions);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadInteraction = typeof leadInteractions.$inferSelect;
export type NewLeadInteraction = typeof leadInteractions.$inferInsert;