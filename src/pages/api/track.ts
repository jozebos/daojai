export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  const db = (locals as any).runtime.env.DB;
  const body = await request.json();
  const { userId, type, resultSummary } = body;

  if (!userId || !type) {
    return new Response(JSON.stringify({ error: "Missing userId or type" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await db
    .prepare("INSERT OR IGNORE INTO users (id) VALUES (?)")
    .bind(userId)
    .run();
  await db
    .prepare('UPDATE users SET last_seen_at = datetime("now") WHERE id = ?')
    .bind(userId)
    .run();

  const result = await db
    .prepare(
      "INSERT INTO readings (user_id, type, result_summary) VALUES (?, ?, ?)"
    )
    .bind(userId, type, JSON.stringify(resultSummary ?? null))
    .run();

  return new Response(
    JSON.stringify({ success: true, readingId: result.meta.last_row_id }),
    { headers: { "Content-Type": "application/json" } }
  );
};
