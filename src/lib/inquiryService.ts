/**
 * Quartz Requirement Inquiry – backend abstraction.
 * Submit to Firebase (or swap for API) and log structured JSON.
 * No hard-coded endpoints; extend for admin panel use.
 */

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type QuartzInquiryPayload = Record<string, unknown>;

const INQUIRY_COLLECTION = "quartz_inquiries";

/**
 * Submit inquiry to backend. Uses Firestore by default; replace implementation for API.
 */
/** Recursively remove undefined values for Firestore compatibility */
function stripUndefined(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    out[k] =
      v !== null && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date)
        ? stripUndefined(v as Record<string, unknown>)
        : v;
  }
  return out;
}

export async function submitQuartzInquiry(payload: QuartzInquiryPayload): Promise<void> {
  const cleanPayload = stripUndefined(payload);
  const structuredLog = {
    timestamp: new Date().toISOString(),
    source: "quartz_inquiry_form",
    payload: cleanPayload,
  };
  console.log("[Quartz Inquiry] Structured JSON:", JSON.stringify(structuredLog, null, 2));

  const doc = {
    ...cleanPayload,
    created_at: Timestamp.now(),
    is_read: false,
  };

  await addDoc(collection(db, INQUIRY_COLLECTION), doc);
}
