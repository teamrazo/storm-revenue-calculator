import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://freeaudit.razorsharpnetworks.com",
  "https://stormcalculator.razorsharpnetworks.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (origin.startsWith("https://rsn-stormcalculator-leadmag-") && origin.endsWith("-getyour-timeback.vercel.app")) return true;
  return false;
}

export function enforceOriginAllowlist(request: Request): NextResponse | null {
  const origin = (request as any).headers?.get?.("origin") ?? null;
  if (isAllowedOrigin(origin)) return null;
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function enforceRateLimit(
  request: Request,
  opts: { route: string; perMinute: number }
): Promise<NextResponse | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const xff = (request as any).headers?.get?.("x-forwarded-for");
  const ip = xff ? xff.split(",")[0].trim() : "unknown";
  const minuteBucket = Math.floor(Date.now() / 60_000);
  const key = `rl:${opts.route}:${ip}:${minuteBucket}`;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([["INCR", key], ["EXPIRE", key, "60"]]),
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return null;
    const result = await res.json();
    const count = result?.[0]?.result ?? 0;
    if (count > opts.perMinute) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429, headers: { "Retry-After": "60" } });
    }
    return null;
  } catch { return null; }
}

export function enforceMaxBody(request: Request, maxBytes = 256 * 1024): NextResponse | null {
  const lenHeader = (request as any).headers?.get?.("content-length");
  if (!lenHeader) return null;
  const size = parseInt(lenHeader, 10);
  if (!Number.isFinite(size)) return null;
  if (size > maxBytes) return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  return null;
}

const EMAIL_REGEX = /^[^\s@<>"]+@[^\s@<>".]+\.[^\s@<>"]{2,}$/;
export function isValidEmail(s: unknown): boolean {
  return typeof s === "string" && s.length > 0 && s.length <= 254 && EMAIL_REGEX.test(s);
}
export function sanitizeForLog(s: unknown, maxLength = 1000): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\x00-\x1F\x7F]/g, " ").slice(0, maxLength);
}
