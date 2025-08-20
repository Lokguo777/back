import { pgTable, pgEnum, serial, integer, text, doublePrecision, timestamp, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ENUM 定義
export const scrapStatusEnum = pgEnum('scrap_status', ['1', '2', '3']);
export const deviceStatusEnum = pgEnum('device_status', ['1', '2', '3']);
export const issueStatusEnum = pgEnum('issue_status', ['1', '2', '3']);
export const userRoleEnum = pgEnum('user_role', ['1', '2', '3']);

// users table
export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull().unique(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull(),
  mail: text('mail'),
  createTime: timestamp('create_time').notNull(),
});

// devices table
export const devices = pgTable('devices', {
  id: integer('id').primaryKey().notNull(),
  status: deviceStatusEnum('status').notNull(),
  name: text('name').notNull(),
  bootTime: timestamp('boot_time').notNull(),
  ratio: doublePrecision('ratio'),
});

// scraps table
export const scraps = pgTable('scraps', {
  id: serial('id').primaryKey().notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
  deviceId: integer('device_id').notNull().references(() => devices.id),
  type: text('type').notNull(),
  status: scrapStatusEnum('status').notNull(),
  humidity: integer('humidity').notNull(),
  weight: integer('weight').notNull(),
  volume: integer('volume').notNull(),
});

// issues table
export const issues = pgTable('issues', {
  id: serial('id').primaryKey().notNull().unique(),
  deviceId: integer('device_id').notNull().references(() => devices.id),
  description: text('description'),
  issuer: integer('issuer').notNull().references(() => users.id),
  assigner: integer('assigner').notNull().references(() => users.id),
  status: issueStatusEnum('status').notNull(),
  createTime: timestamp('create_time').notNull(),
});

// maintenance_records table
export const maintenanceRecords = pgTable('maintenance_records', {
  id: serial('id').primaryKey().notNull().unique(),
  issueId: integer('issue_id').notNull().references(() => issues.id),
  userId: integer('user_id').notNull().references(() => users.id),
  description: text('description').notNull(),
  createTime: timestamp('create_time').notNull(),
  endTime: timestamp('end_time').notNull(),
});

// schedule table
export const schedule = pgTable('schedule', {
  id: serial('id').primaryKey().notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
  deviceId: integer('device_id').references(() => devices.id),
  title: text('title').notNull(),
  description: text('description'),
  date: date('date').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
});

// energy_record table
export const energyRecord = pgTable('energy_record', {
  id: serial('id').primaryKey().notNull().unique(),
  deviceId: integer('device_id').references(() => devices.id),
  type: text('type'),
  date: date('date'),
  consumption: doublePrecision('consumption'),
});

// carbon table
export const carbon = pgTable('carbon', {
  id: serial('id').primaryKey().notNull().unique(),
  userId: integer('user_id').notNull().references(() => users.id),
  fuelName: text('Fuel_name').notNull(),
  consumption: doublePrecision('consumption').notNull(),
  electricity: doublePrecision('Electricity'),
  coefficient: doublePrecision('coefficient').notNull(),
});

// 關聯（可依需求擴充）
export const usersRelations = relations(users, ({ many }) => ({
  scraps: many(scraps),
  issuesIssued: many(issues, { relationName: 'issuer' }),
  issuesAssigned: many(issues, { relationName: 'assigner' }),
  maintenanceRecords: many(maintenanceRecords),
  schedule: many(schedule),
  carbon: many(carbon),
}));

export const devicesRelations = relations(devices, ({ many }) => ({
  scraps: many(scraps),
  issues: many(issues),
  schedule: many(schedule),
  energyRecord: many(energyRecord),
}));

export const scrapsRelations = relations(scraps, ({ one }) => ({
  user: one(users, { fields: [scraps.userId], references: [users.id] }),
  device: one(devices, { fields: [scraps.deviceId], references: [devices.id] }),
}));

export const issuesRelations = relations(issues, ({ one }) => ({
  device: one(devices, { fields: [issues.deviceId], references: [devices.id] }),
  issuer: one(users, { fields: [issues.issuer], references: [users.id], relationName: 'issuer' }),
  assigner: one(users, { fields: [issues.assigner], references: [users.id], relationName: 'assigner' }),
}));

export const maintenanceRecordsRelations = relations(maintenanceRecords, ({ one }) => ({
  issue: one(issues, { fields: [maintenanceRecords.issueId], references: [issues.id] }),
  user: one(users, { fields: [maintenanceRecords.userId], references: [users.id] }),
}));

export const scheduleRelations = relations(schedule, ({ one }) => ({
  user: one(users, { fields: [schedule.userId], references: [users.id] }),
  device: one(devices, { fields: [schedule.deviceId], references: [devices.id] }),
}));

export const energyRecordRelations = relations(energyRecord, ({ one }) => ({
  device: one(devices, { fields: [energyRecord.deviceId], references: [devices.id] }),
}));

export const carbonRelations = relations(carbon, ({ one }) => ({
  user: one(users, { fields: [carbon.userId], references: [users.id] }),
})); 