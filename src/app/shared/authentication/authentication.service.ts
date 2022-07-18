import {Injectable} from '@angular/core';
import {UserForAuth} from "./user-for-authentication-dto";
import {Observable, Subject} from "rxjs";
import {AuthResponseDto} from "./response";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RegistrationResponseDto} from "./registration-response-dto";
import {UserForRegistrationDto} from './user-for-registration-dto';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string;

  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    this.url = environment.serverUrl + '/api/Auth';
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    //@ts-ignore
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  registerUser(route: string, body: UserForRegistrationDto) {
    return this.httpClient.post<RegistrationResponseDto>(this.createCompleteRoute(route, environment.serverUrl), body)
  }

  createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`
  }

  loginUser(route: string, body: UserForAuth): Observable<any> {
    return this.httpClient.post<AuthResponseDto>(this.url + '/login', body)
  }

  logout(): void {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }
}
