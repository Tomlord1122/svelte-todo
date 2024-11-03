import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

export const todo = pgTable('todo', {
	id: serial('id').primaryKey(),
	task: text('task').notNull(),
	award: text('award').notNull(),
	completed: boolean('completed').notNull().default(false),
	targetCount: integer('target_count').notNull().default(1),
	currentCount: integer('current_count').notNull().default(0),
	percentage: integer('percentage').notNull().default(0),
	showCompletionAnimation: boolean('show_completion_animation').notNull().default(false)
});
