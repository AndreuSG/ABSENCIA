import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_hero_media_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_type" "enum_pages_blocks_hero_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "pages" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hero_type" "enum__pages_v_blocks_hero_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hero_subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_subtitle" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero_hero_links" ADD CONSTRAINT "pages_blocks_hero_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_hero_links_order_idx" ON "pages_blocks_hero_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_hero_links_parent_id_idx" ON "pages_blocks_hero_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_hero_links_order_idx" ON "_pages_v_blocks_hero_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_hero_links" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_hero_hero_media_idx" ON "pages_blocks_hero" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_hero_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("hero_media_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "rich_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "media_id";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_hero_links" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_hero_hero_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_hero_hero_hero_media_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "type" "enum_pages_blocks_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "type" "enum__pages_v_blocks_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_media_idx" ON "pages_blocks_hero" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_media_idx" ON "_pages_v_blocks_hero" USING btree ("media_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "hero_type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "hero_type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "hero_title";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "hero_subtitle";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_subtitle";
  DROP TYPE "public"."enum_pages_blocks_hero_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_hero_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_hero_type";`)
}
