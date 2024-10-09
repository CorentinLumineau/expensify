CREATE TABLE IF NOT EXISTS "compound_interest_calculator" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"principal" integer NOT NULL,
	"rate" integer NOT NULL,
	"time" integer NOT NULL,
	"compound_frequency" integer NOT NULL,
	"result" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
