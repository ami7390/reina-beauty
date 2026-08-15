import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["unread", "read"] }).notNull().default("unread"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
}, (table) => [
  index("contact_messages_status_idx").on(table.status),
  index("contact_messages_created_at_idx").on(table.createdAt),
]);

export const catalogProducts = sqliteTable("catalog_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  badge: text("badge").notNull().default("Nouveau"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
}, (table) => [index("catalog_products_published_idx").on(table.published)]);

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
