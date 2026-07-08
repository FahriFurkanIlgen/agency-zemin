import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { DEFAULT_CONTENT, type SiteContent } from "./content";
import { withLinktreeOpenCalls } from "./linktree";

const FILE_PATH = path.join(process.cwd(), "data", "content.json");
const usePostgres = Boolean(process.env.POSTGRES_URL);

/** Read content from the local JSON file, seeding defaults if missing. */
async function readFile(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}

async function writeFile(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(content, null, 2), "utf8");
}

/** Ensure the Postgres table exists. */
async function ensurePostgres() {
  const { sql } = await import("@vercel/postgres");
  await sql`CREATE TABLE IF NOT EXISTS site_content (
    id INT PRIMARY KEY DEFAULT 1,
    data JSONB NOT NULL
  )`;
  return sql;
}

async function readPostgres(): Promise<SiteContent> {
  const sql = await ensurePostgres();
  const { rows } = await sql`SELECT data FROM site_content WHERE id = 1`;
  if (rows.length === 0) return DEFAULT_CONTENT;
  return rows[0].data as SiteContent;
}

async function writePostgres(content: SiteContent): Promise<void> {
  const sql = await ensurePostgres();
  const json = JSON.stringify(content);
  await sql`INSERT INTO site_content (id, data)
    VALUES (1, ${json}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = ${json}::jsonb`;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const stored = usePostgres ? await readPostgres() : await readFile();
    // Merge with defaults so newly added top-level sections are always present.
    const content = {
      ...DEFAULT_CONTENT,
      ...stored,
      theme: { ...DEFAULT_CONTENT.theme, ...stored.theme },
      contact: { ...DEFAULT_CONTENT.contact, ...stored.contact },
      openCalls: { ...DEFAULT_CONTENT.openCalls, ...stored.openCalls },
    };
    return withLinktreeOpenCalls(content);
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (usePostgres) {
    await writePostgres(content);
  } else {
    if (process.env.VERCEL) {
      throw new Error(
        "Content storage is not configured. Set POSTGRES_URL in Vercel to save admin changes.",
      );
    }
    await writeFile(content);
  }
}
