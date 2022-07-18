import { Injectable } from '@angular/core';
import {UserForAuth} from "../users/user-for-authentication-dto";
import {Observable} from "rxjs";
import {AuthResponseDto} from "./response";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.serverUrl + '/api/Auth';
  }

  loginUser(route: string, body: UserForAuth): Observable<any> {
    return this.httpClient.post<AuthResponseDto>(this.url + '/login', body)
  }
}
