import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Post} from "./post";
import {BaseApiParams} from "../base-api-params";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.serverUrl + '/api/posts';
  }

  getPosts(baseApiParams: BaseApiParams): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(this.url, {params: (baseApiParams as any)})
  }

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(this.url + `/${id}`)
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(this.url + `/${id}`)
  }

  updatePost(post: Post): Observable<any> {
    return this.httpClient.put(this.url + `/${post.id}`, post)
  }

  addPost(post: Post): Observable<any> {
    return this.httpClient.post(this.url, post)
  }
}
