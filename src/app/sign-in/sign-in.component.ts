import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserForAuth} from "../shared/authentication/user-for-authentication-dto";
import {AuthResponseDto} from "../shared/authentication/response";
import {AuthenticationService} from "../shared/authentication/authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  returnUrl?: string

  loginForm!: FormGroup
  errorMessage: string = '';
  showError?: boolean;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl(controlName: string): boolean {
    // @ts-ignore
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    // @ts-ignore
    return this.loginForm.get(controlName).hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {...loginFormValue};
    const userForAuth: UserForAuth = {
      username: login.username,
      password: login.password
    }
    this.authService.loginUser('api/accounts/login', userForAuth)
      .subscribe({
        next: (res: AuthResponseDto) => {
          localStorage.setItem("token", res.token)
          localStorage.setItem("username", userForAuth.username)
          this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful)
          this.router.navigate([this.returnUrl]).then(() => {
          })
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message
          this.showError = true
        }
      })
  }
}
