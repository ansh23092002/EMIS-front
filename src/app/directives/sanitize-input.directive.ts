import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { sanitizeInput, SanitizationMode } from '../helper/sanitizer.helper';

@Directive({
  selector:
    '[appSanitizeInput], [appSanitize], input[type="text"]:not([noSanitize]), input:not([type]):not([noSanitize]), textarea:not([noSanitize])',
  standalone: true,
})
export class AppSanitizeInputDirective implements OnInit {
  /**
   * Sanitization mode:
   * - 'safeText' (default): Removes scripts, HTML tags, and dangerous brackets (<, >) while allowing regular text.
   * - 'letters': Allows only English letters (a-z, A-Z) and spaces.
   * - 'alphanumeric': Allows letters, numbers, spaces, and safe punctuation (. _ - ,).
   * - 'numeric': Allows only digits (0-9).
   * - 'url': Allows safe URL characters, strictly blocking javascript: and scripts.
   */
  @Input('appSanitizeInput') set sanitizeMode(val: SanitizationMode | '') {
    if (val) {
      this.mode = val;
    }
  }

  @Input() mode: SanitizationMode = 'safeText';
  @Input() maxLen?: number;
  @Input() trimOnBlur = true;

  constructor(
    private readonly el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() private readonly ngControl: NgControl
  ) {}

  ngOnInit(): void {
    // Sanitize any pre-filled or initial value
    if (this.el.nativeElement.value) {
      this.applySanitization(this.el.nativeElement.value);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Block direct entry of dangerous angle brackets
    if (event.key === '<' || event.key === '>') {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const key = event.key;

    // Allow control keys (backspace, enter, tab, delete, arrows, etc.)
    if (event.ctrlKey || event.altKey || event.metaKey || key.length > 1) {
      return true;
    }

    // Always block HTML angle brackets to prevent script / tag injection
    if (key === '<' || key === '>') {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    if (this.mode === 'letters') {
      const isLetterOrSpace = /^[a-zA-Z\s]$/.test(key);
      if (!isLetterOrSpace) {
        event.preventDefault();
        return false;
      }
    } else if (this.mode === 'numeric') {
      const isDigit = /^[0-9]$/.test(key);
      if (!isDigit) {
        event.preventDefault();
        return false;
      }
    } else if (this.mode === 'alphanumeric') {
      const isAlphaNum = /^[a-zA-Z0-9\s._,-]$/.test(key);
      if (!isAlphaNum) {
        event.preventDefault();
        return false;
      }
    }

    return true;
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    const rawValue = this.el.nativeElement.value;
    this.applySanitization(rawValue);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    const pastedText = clipboardData.getData('text') || '';
    const sanitizedPaste = sanitizeInput(pastedText, this.mode, this.maxLen);

    event.preventDefault();
    event.stopPropagation();

    const input = this.el.nativeElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value || '';
    const newValue =
      currentValue.slice(0, start) + sanitizedPaste + currentValue.slice(end);
    const finalSanitized = sanitizeInput(newValue, this.mode, this.maxLen);

    input.value = finalSanitized;
    this.updateControlValue(finalSanitized);

    const newCursorPos = start + sanitizedPaste.length;
    input.setSelectionRange(newCursorPos, newCursorPos);
  }

  @HostListener('blur')
  onBlur(): void {
    const rawValue = this.el.nativeElement.value || '';
    const cleaned = this.trimOnBlur ? rawValue.trim() : rawValue;
    this.applySanitization(cleaned);
  }

  private applySanitization(currentValue: string): void {
    const sanitized = sanitizeInput(currentValue, this.mode, this.maxLen);
    if (currentValue !== sanitized) {
      this.el.nativeElement.value = sanitized;
      this.updateControlValue(sanitized);
    }
  }

  private updateControlValue(value: string): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value, {
        emitEvent: true,
        emitModelToViewChange: false,
      });
    }
  }
}
