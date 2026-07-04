import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

const FILE_PATH = path.join(process.cwd(), "data", "newsletter.json");
const usePostgres = Boolean(process.env.POSTGRES_URL);

type Subscriber = {
  email: string;
  createdAt: string;
};

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveToFile(email: string) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });

  const subscribers = await readFromFile();

  if (!subscribers.some((subscriber) => subscriber.email === email)) {
    subscribers.push({ email, createdAt: new Date().toISOString() });
    await fs.writeFile(FILE_PATH, JSON.stringify(subscribers, null, 2), "utf8");
  }
}

async function readFromFile(): Promise<Subscriber[]> {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf8")) as Subscriber[];
  } catch {
    return [];
  }
}

async function saveToPostgres(email: string) {
  const { sql } = await import("@vercel/postgres");
  await sql`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`INSERT INTO newsletter_subscribers (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING`;
}

async function readFromPostgres(): Promise<Subscriber[]> {
  const { sql } = await import("@vercel/postgres");
  await sql`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  const { rows } = await sql<{ email: string; created_at: Date }>`
    SELECT email, created_at
    FROM newsletter_subscribers
    ORDER BY created_at DESC
  `;

  return rows.map((row) => ({
    email: row.email,
    createdAt: row.created_at.toISOString(),
  }));
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const subscribers = usePostgres ? await readFromPostgres() : await readFromFile();
  return NextResponse.json({ subscribers });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = normalizeEmail((body as { email?: unknown })?.email);
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    if (usePostgres) await saveToPostgres(email);
    else await saveToFile(email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}