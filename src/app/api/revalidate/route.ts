import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Manual cache refresh for /admin. Saving content already revalidates on its own —
 * this covers the cases it cannot see, such as content edited straight in Postgres
 * or a stale page that needs to be rebuilt without touching the content.
 */
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
