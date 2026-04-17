export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, locals }) => {
  const db = (locals as any).runtime.env.DB;
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const readings = await db
    .prepare(
      "SELECT * FROM readings WHERE user_id = ? ORDER BY created_at DESC LIMIT 50"
    )
    .bind(userId)
    .all();

  return new Response(JSON.stringify(readings.results), {
    headers: { "Content-Type": "application/json" },
  });
};
