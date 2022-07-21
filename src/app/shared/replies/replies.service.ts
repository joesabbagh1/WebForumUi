import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Reply} from "./reply";

@Injectable({
  providedIn: 'root'
})
export class RepliesService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.serverUrl + '/api/replies';
  }

  getReplies(): Observable<Array<Reply>> {
    return this.httpClient.get<Array<Reply>>(this.url)
  }

  getRepliesByCommentId(id: string): Observable<Array<Reply>> {
    return this.httpClient.get<Array<Reply>>(this.url + `/${id}`)
  }

  deleteReply(id: string): Observable<any> {
    return this.httpClient.delete(this.url + `/${id}`)
  }

  updateReply(reply: Reply): Observable<any> {
    return this.httpClient.put(this.url + `/${reply.id}`, reply)
  }

  addReply(reply: Reply): Observable<any> {
    return this.httpClient.post(this.url, reply)
  }
}
