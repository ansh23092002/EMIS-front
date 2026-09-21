import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasXssPayload } from './sanitizer.helper';

/**
 * Custom Angular Validators for Form Controls
 */
export class CustomValidators {
  /**
   * Validator that rejects any input containing HTML tags, scripts, or dangerous JS patterns
   */
  static noScript(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      if (hasXssPayload(control.value)) {
        return { containsScript: true, message: 'HTML tags or script code are not allowed.' };
      }
      return null;
    };
  }

  /**
   * Validator for only English letters and spaces
   */
  static onlyLetters(): ValidatorFn {
    const regex = /^[a-zA-Z\s]*$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      if (!regex.test(control.value)) {
        return { onlyLetters: true, message: 'Only alphabetic letters and spaces are allowed.' };
      }
      return null;
    };
  }

  /**
   * Validator for alphanumeric characters and basic punctuation
   */
  static alphanumeric(allowPunctuation: boolean = true): ValidatorFn {
    const regex = allowPunctuation ? /^[a-zA-Z0-9\s._-]*$/ : /^[a-zA-Z0-9\s]*$/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }
      if (!regex.test(control.value)) {
        return { alphanumeric: true, message: 'Only alphanumeric characters are allowed.' };
      }
      return null;
    };
  }
}
