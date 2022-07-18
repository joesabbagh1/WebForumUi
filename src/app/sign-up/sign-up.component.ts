import {Component, OnInit} from '@angular/core';
import {UsersService} from "../shared/users/users.service";
import {NgForm} from "@angular/forms";
import {User} from "../shared/users/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User = new User()

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.usersService.addUser(this.user).subscribe(response => {
        // TODO
      })
    }
  }
}
