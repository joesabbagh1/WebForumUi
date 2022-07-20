import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication/authentication.service";
import {UserForRegistrationDto} from "../shared/authentication/user-for-registration-dto";
import {HttpErrorResponse} from "@angular/common/http";
import {PasswordConfirmationValidatorService} from "../shared/authentication/password-confirmation-validator.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup
  errorMessage: string = ''
  showError?: boolean

  constructor(private router: Router,
              private authService: AuthenticationService,
              private passConfValidator: PasswordConfirmationValidatorService) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    })
    // @ts-ignore
    this.registerForm.get('confirm').setValidators([Validators.required,
      this.passConfValidator.validateConfirmPassword(this.registerForm.get('password') as AbstractControl)])
  }

  validateControl(controlName: string): boolean {
    // @ts-ignore
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched
  }

  hasError(controlName: string, errorName: string): boolean {
    // @ts-ignore
    return this.registerForm.get(controlName).hasError(errorName)
  }

  registerUser(registerFormValue: any): void {
    this.showError = false
    const formValues = {...registerFormValue}
    const user: UserForRegistrationDto = {
      username: formValues.username,
      password: formValues.password,
      confirmPassword: formValues.confirm
    }
    this.authService.registerUser("api/Users", user)
      .subscribe({
        next: (_) => console.log("Successful registration"),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
        }
      })
  }
}
