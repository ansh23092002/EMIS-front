import { Injectable } from '@angular/core';
import {
  sanitizeInput,
  stripHtmlAndScripts,
  hasXssPayload,
  sanitizePayload,
  SanitizationMode,
} from '../helper/sanitizer.helper';

@Injectable({
  providedIn: 'root',
})
export class SanitizerService {
  /**
   * Sanitizes a single text string by stripping XSS patterns, HTML tags, and unwanted characters
   */
  sanitize(
    value: string | null | undefined,
    mode: SanitizationMode = 'safeText',
    maxLength?: number
  ): string {
    return sanitizeInput(value, mode, maxLength);
  }

  /**
   * Strips all HTML and script tags from text
   */
  stripHtml(value: string | null | undefined): string {
    return stripHtmlAndScripts(value);
  }

  /**
   * Checks if input contains potential script/XSS payload
   */
  isDangerous(value: unknown): boolean {
    return hasXssPayload(value);
  }

  /**
   * Sanitizes an entire request body object/array before API call
   */
  sanitizePayload<T>(payload: T): T {
    return sanitizePayload(payload);
  }
}
