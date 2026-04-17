function getOrCreateUserId(): string {
  const key = "daojai-user-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export async function trackReading(
  type: string,
  resultSummary: Record<string, unknown>
): Promise<number | null> {
  const userId = getOrCreateUserId();
  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, type, resultSummary }),
    });
    const data = await res.json();
    return data.readingId ?? null;
  } catch {
    return null;
  }
}

export async function submitFeedback(
  type: string,
  liked: boolean,
  readingId?: number
): Promise<void> {
  const userId = getOrCreateUserId();
  try {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, readingId, type, liked }),
    });
  } catch {
    // Fail silently — tracking should never break UX
  }
}
