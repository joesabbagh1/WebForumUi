import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserPassword} from "../shared/users/user-password";
import {UsersService} from "../shared/users/users.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: UserPassword = new UserPassword()

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

    }
  }
}
