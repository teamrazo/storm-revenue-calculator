import { sanitizeForLog } from "@/lib/api-helpers";

export const NOTIFY_TAGS = {
  newLead: "notify:new-lead",
  newCustomer: "notify:new-customer",
  supportRequest: "notify:support-request",
  featureRequest: "notify:feature-request",
  auditSubmitted: "notify:audit-submitted",
};

export interface SlackPayload {
  title: string;
  fields: [string, string | number | boolean | null | undefined][];
  footer?: string;
}

export async function sendSlackNotification(payload: SlackPayload): Promise<number> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!webhookUrl) return 0;
  const lines: string[] = [`*${sanitizeForLog(payload.title, 200)}*`, ""];
  for (const [label, raw] of payload.fields) {
    if (raw === null || raw === undefined || raw === "" || raw === false) continue;
    lines.push(`*${sanitizeForLog(label, 80)}:* ${sanitizeForLog(String(raw), 500)}`);
  }
  if (payload.footer) { lines.push(""); lines.push(sanitizeForLog(payload.footer, 500)); }
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
      signal: AbortSignal.timeout(3000),
    });
    return res.status;
  } catch { return 0; }
}
