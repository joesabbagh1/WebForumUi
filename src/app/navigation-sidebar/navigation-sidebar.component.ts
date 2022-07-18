import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthenticationService} from "../shared/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-sidebar',
  templateUrl: './navigation-sidebar.component.html',
  styleUrls: ['./navigation-sidebar.component.scss']
})
export class NavigationSidebarComponent implements OnInit {
  public isUserAuthenticated?: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService,
              private router: Router) {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  ngOnInit(): void {
    this.authService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(["/"]).then()
  }
}
