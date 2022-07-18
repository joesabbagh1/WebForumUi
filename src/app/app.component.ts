import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./shared/authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WebForumUi';

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated())
      this.authService.sendAuthStateChangeNotification(true);
  }
}
