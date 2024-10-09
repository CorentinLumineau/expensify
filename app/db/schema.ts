import { pgTable, serial, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const compoundInterestCalculator = pgTable('compound_interest_calculator', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  principal: integer('principal').notNull(),
  rate: integer('rate').notNull(),
  time: integer('time').notNull(),
  compoundFrequency: integer('compound_frequency').notNull(),
  result: integer('result').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});