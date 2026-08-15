CREATE TABLE `catalog_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`price` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`badge` text DEFAULT 'Nouveau' NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `catalog_products_published_idx` ON `catalog_products` (`published`);