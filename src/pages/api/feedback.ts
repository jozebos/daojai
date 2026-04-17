export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  const db = (locals as any).runtime.env.DB;
  const { userId, readingId, type, liked } = await request.json();

  if (!userId || !type || liked === undefined) {
    return new Response(
      JSON.stringify({ error: "Missing userId, type, or liked" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  await db
    .prepare(
      "INSERT INTO feedback (user_id, reading_id, type, liked) VALUES (?, ?, ?, ?)"
    )
    .bind(userId, readingId || null, type, liked ? 1 : 0)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
