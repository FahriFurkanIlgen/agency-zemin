import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

const FILE_PATH = path.join(process.cwd(), "data", "bookings.json");
const usePostgres = Boolean(process.env.POSTGRES_URL);

type BookingRequest = {
  id: string;
  name: string;
  email: string;
  date: string;
  message: string;
  categories: string[];
  createdAt: string;
};

function cleanString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function normalizeEmail(value: unknown) {
  return cleanString(value).toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanCategories(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

async function readFromFile(): Promise<BookingRequest[]> {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf8")) as BookingRequest[];
  } catch {
    return [];
  }
}

async function saveToFile(booking: BookingRequest) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  const bookings = await readFromFile();
  bookings.unshift(booking);
  await fs.writeFile(FILE_PATH, JSON.stringify(bookings, null, 2), "utf8");
}

async function ensurePostgres() {
  const { sql } = await import("@vercel/postgres");
  await sql`CREATE TABLE IF NOT EXISTS booking_requests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    requested_date TEXT,
    message TEXT NOT NULL,
    categories JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  return sql;
}

async function saveToPostgres(booking: BookingRequest) {
  const sql = await ensurePostgres();
  const categories = JSON.stringify(booking.categories);
  await sql`INSERT INTO booking_requests (
    id,
    name,
    email,
    requested_date,
    message,
    categories,
    created_at
  ) VALUES (
    ${booking.id},
    ${booking.name},
    ${booking.email},
    ${booking.date},
    ${booking.message},
    ${categories}::jsonb,
    ${booking.createdAt}
  )`;
}

async function readFromPostgres(): Promise<BookingRequest[]> {
  const sql = await ensurePostgres();
  const { rows } = await sql<{
    id: string;
    name: string;
    email: string;
    requested_date: string | null;
    message: string;
    categories: string[];
    created_at: Date;
  }>`
    SELECT id, name, email, requested_date, message, categories, created_at
    FROM booking_requests
    ORDER BY created_at DESC
  `;

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    date: row.requested_date || "",
    message: row.message,
    categories: row.categories,
    createdAt: row.created_at.toISOString(),
  }));
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const bookings = usePostgres ? await readFromPostgres() : await readFromFile();
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as {
    name?: unknown;
    email?: unknown;
    date?: unknown;
    message?: unknown;
    categories?: unknown;
  };

  const name = cleanString(payload.name);
  const email = normalizeEmail(payload.email);
  const date = cleanString(payload.date);
  const message = cleanString(payload.message);
  const categories = cleanCategories(payload.categories);

  if (!name || !isValidEmail(email) || !message) {
    return NextResponse.json({ error: "Invalid booking request" }, { status: 400 });
  }

  const booking: BookingRequest = {
    id: crypto.randomUUID(),
    name,
    email,
    date,
    message,
    categories,
    createdAt: new Date().toISOString(),
  };

  try {
    if (usePostgres) await saveToPostgres(booking);
    else await saveToFile(booking);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Booking request failed" }, { status: 500 });
  }
}