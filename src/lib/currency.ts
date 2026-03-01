/**
 * Currency detection and formatting by country.
 * Detects user region (India → INR, US → USD) and formats prices accordingly.
 */

export type CurrencyCode = "INR" | "USD";

// Base exchange rate (INR per 1 USD). Update periodically or fetch from an API.
const INR_PER_USD = 83;

const RATES: Record<string, number> = {
  USD: 1,
  INR: INR_PER_USD,
};

/**
 * Detect user's currency from browser timezone and locale.
 * India (Asia/Kolkata) → INR, United States → USD, default → INR.
 */
export function getUserCurrency(): CurrencyCode {
  if (typeof Intl === "undefined") return "INR";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("America/") || tz === "US/Pacific" || tz === "US/Eastern" || tz === "US/Central" || tz === "US/Mountain") {
      return "USD";
    }
    if (tz.startsWith("Asia/Kolkata") || tz === "Asia/Calcutta") {
      return "INR";
    }

    const locale = navigator.language || (navigator as any).userLanguage || "";
    if (locale.endsWith("-US") || locale === "en-US") return "USD";
    if (locale.endsWith("-IN") || locale === "en-IN") return "INR";
  } catch {
    // ignore
  }

  return "INR";
}

/**
 * Get currency symbol for display.
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  return currency === "INR" ? "₹" : "$";
}

/**
 * Parse a price string (e.g. "₹1,000", "$50", "1000 per unit") to extract numeric value and source currency.
 */
export function parsePrice(priceStr: string): { amount: number; currency: CurrencyCode } | null {
  if (!priceStr || typeof priceStr !== "string") return null;

  const cleaned = priceStr.replace(/,/g, "").trim();
  const numMatch = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!numMatch) return null;

  const amount = parseFloat(numMatch[1]);
  if (Number.isNaN(amount)) return null;

  const upper = cleaned.toUpperCase();
  if (upper.includes("$") || upper.includes("USD") || upper.startsWith("USD")) {
    return { amount, currency: "USD" };
  }
  if (upper.includes("₹") || upper.includes("INR") || upper.includes("RS") || upper.startsWith("RS.")) {
    return { amount, currency: "INR" };
  }

  return { amount, currency: "INR" };
}

/**
 * Convert amount from one currency to another.
 */
export function convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount;
  if (from === "USD" && to === "INR") return amount * RATES.INR;
  if (from === "INR" && to === "USD") return amount / RATES.INR;
  return amount;
}

/**
 * Format a number as currency using Intl.
 */
export function formatCurrency(amount: number, currency: CurrencyCode): string {
  try {
    const locale = currency === "INR" ? "en-IN" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${Math.round(amount).toLocaleString()}`;
  }
}

/**
 * Take a stored price string (e.g. from admin "₹1000" or "50 USD"), convert to user's currency, and return formatted string.
 * If parsing fails, returns the original string.
 */
export function formatPriceForUser(
  priceStr: string,
  userCurrency: CurrencyCode
): string {
  const parsed = parsePrice(priceStr);
  if (!parsed) return priceStr;

  const converted = convert(parsed.amount, parsed.currency, userCurrency);
  return formatCurrency(converted, userCurrency);
}
