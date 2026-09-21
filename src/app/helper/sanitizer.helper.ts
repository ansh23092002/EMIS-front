/**
 * Sanitizer Helper Utility
 * Comprehensive prevention against XSS, script injection, HTML tags, and malicious payloads.
 */

export type SanitizationMode = 'safeText' | 'letters' | 'alphanumeric' | 'numeric' | 'url';

/**
 * Checks whether a given value contains potential XSS, HTML tags, or script payloads.
 * Uses stateless RegExp (without /g flag on test) to prevent stateful lastIndex bugs.
 */
export function hasXssPayload(value: unknown): boolean {
  if (typeof value !== 'string' || !value) {
    return false;
  }

  const str = value.trim();
  if (!str) {
    return false;
  }

  return (
    /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(str) ||
    /<\/?[a-z][\s\S]*>/i.test(str) ||
    /javascript\s*:/i.test(str) ||
    /vbscript\s*:/i.test(str) ||
    /data\s*:\s*text\/html/i.test(str) ||
    /on[a-z]+\s*=/i.test(str) ||
    /[<>]/.test(str)
  );
}

/**
 * Strips script tags, HTML tags, javascript protocols, event handlers, and dangerous characters.
 */
export function stripHtmlAndScripts(value: string | null | undefined): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let text = value;

  // 1. Remove complete <script>...</script> blocks
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 2. Remove script / iframe / embed / object / style tags even if unclosed
  text = text.replace(/<\/?(?:script|iframe|object|embed|style|link|meta|applet)\b[^>]*>/gi, '');

  // 3. Remove inline event handlers (e.g. onerror=..., onclick=..., onload=...)
  text = text.replace(/on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 4. Remove dangerous protocols (javascript:, vbscript:, data:text/html)
  text = text.replace(/(?:javascript|vbscript|livescript)\s*:/gi, '');
  text = text.replace(/data\s*:\s*text\/html[^;,]*[;,]/gi, '');

  // 5. Remove any remaining HTML tags <...>
  text = text.replace(/<\/?[a-z][^>]*>/gi, '');

  // 6. Strip raw angle brackets so no HTML tags can ever be formed
  text = text.replace(/[<>]/g, '');

  return text;
}

/**
 * Sanitizes input string based on specified mode
 */
export function sanitizeInput(
  value: string | null | undefined,
  mode: SanitizationMode = 'safeText',
  maxLength?: number
): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let cleaned = stripHtmlAndScripts(value);

  switch (mode) {
    case 'letters':
      // Only English letters and spaces
      cleaned = cleaned.replace(/[^a-zA-Z\s]/g, '');
      break;

    case 'alphanumeric':
      // Letters, numbers, spaces, and safe punctuation (. _ - ,)
      cleaned = cleaned.replace(/[^a-zA-Z0-9\s._,-]/g, '');
      break;

    case 'numeric':
      // Only digits
      cleaned = cleaned.replace(/[^0-9]/g, '');
      break;

    case 'url':
      // Safe URL characters, disallowing scripts, quotes, brackets, semicolons
      cleaned = cleaned.replace(/[<>"'`()\\^]/g, '');
      break;

    case 'safeText':
    default:
      // Remove dangerous characters ({ } [ ] \ ` ~ ^) while preserving normal text punctuation
      cleaned = cleaned.replace(/[{}[\]\\`~^]/g, '');
      break;
  }

  if (maxLength && maxLength > 0) {
    cleaned = cleaned.slice(0, maxLength);
  }

  return cleaned;
}

/**
 * Recursively sanitizes all string properties within an object/array payload before sending to backend
 */
export function sanitizePayload<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeInput(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizePayload(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const result: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      const val = (data as Record<string, any>)[key];
      result[key] = sanitizePayload(val);
    }
    return result as T;
  }

  return data;
}
