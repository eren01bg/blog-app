import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('password2')?.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      return { passwordMatch: true };
    }

    return null;
  };
}
