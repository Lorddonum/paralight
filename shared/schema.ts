import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  modelNumber: text("model_number").notNull(),
  description: text("description").notNull(),
  series: text("series").notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  application: text("application"),
  finish: text("finish"),
  material: text("material"),
  wattage: text("wattage"),
  dimensions: text("dimensions"),
  voltage: text("voltage"),
  color: text("color"),
  cri: text("cri"),
  cct: text("cct"),
  beamAngle: text("beam_angle"),
  image: text("image"),
  catalogueUrl: text("catalogue_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
