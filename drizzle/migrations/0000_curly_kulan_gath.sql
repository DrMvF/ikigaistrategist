CREATE TABLE `cycle_entries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`cycle_day` int NOT NULL,
	`cycle_phase` varchar(20) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `cycle_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reflections` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`input_text` text NOT NULL,
	`reflection_text` text NOT NULL,
	`environment` varchar(20) DEFAULT 'dev',
	`created_at` timestamp DEFAULT (now()),
	`love_score` int,
	`skill_score` int,
	`world_score` int,
	`finance_score` int,
	CONSTRAINT `reflections_id` PRIMARY KEY(`id`)
);
