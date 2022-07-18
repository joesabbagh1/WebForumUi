import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasswordConfirmationValidatorService {

  constructor() {
  }

  validateConfirmPassword(passwordControl: AbstractControl): ValidatorFn {
    return (confirmationControl: AbstractControl): { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;

      if (confirmValue === '') {
        return null
      } else if (confirmValue !== passwordValue) {
        return {mustMatch: true}
      } else return null;
    };
  }
}
