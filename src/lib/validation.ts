/**
 * Normalizes input to a clean 10-digit Indian mobile number.
 * Handles '+91', '91', leading '0', spaces, hyphens, and brackets.
 */
export function normalizeIndianPhone(raw: string): string {
  if (!raw) return '';
  // Remove all non-digits
  let digits = raw.replace(/\D/g, '');

  // Strip international prefix '91' if length is 12 and starts with 91
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }

  // Strip trunk prefix '0' if length is 11 and starts with 0
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // Return up to 10 digits
  return digits.slice(0, 10);
}

/**
 * Validates whether the string is a valid 10-digit Indian mobile number.
 * Valid Indian mobile numbers are 10 digits and begin with 6, 7, 8, or 9.
 */
export function isValidIndianPhone(phone: string): boolean {
  const normalized = normalizeIndianPhone(phone);
  return /^[6-9]\d{9}$/.test(normalized);
}

/**
 * Formats a 10-digit number for human display: '+91 XXXXX XXXXX'
 */
export function formatIndianPhoneDisplay(phone: string): string {
  const normalized = normalizeIndianPhone(phone);
  if (normalized.length !== 10) return phone;
  return `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`;
}
