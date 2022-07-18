import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UsersService} from "../shared/users/users.service";
import {User} from "../shared/users/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User()

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

    }
  }
}
