import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../shared/posts/post";
import {PostsService} from "../shared/posts/posts.service";
import {User} from "../shared/users/user";
import {UsersService} from "../shared/users/users.service";
import {BaseApiParams} from "../shared/base-api-params";
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, OnDestroy {
  posts?: Array<Post>
  users?: Array<User>

  baseApiParams: BaseApiParams
  searchSubject: Subject<string>
  subscriptions: Subscription

  constructor(private postsService: PostsService,
              private usersService: UsersService) {
    this.baseApiParams = new BaseApiParams();
    this.subscriptions = new Subscription();
    this.searchSubject = new Subject<string>();
  }

  ngOnInit(): void {
    this.reloadPosts()
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
    this.subscriptions.add(this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(search => {
        if (!this.baseApiParams.request) {
          delete this.baseApiParams.request;
        }
        this.reloadPosts();
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  reloadPosts() {
    this.postsService.getPosts(this.baseApiParams).subscribe(response => {
      this.posts = response
    })
  }

  onSearchChanged() {
    if (this.baseApiParams.request != null) {
      this.searchSubject.next(this.baseApiParams.request);
    }
  }

  onClearPressed() {
    delete this.baseApiParams.request
    this.reloadPosts()
  }

  getPostUri(id: string): string {
    return `../posts/post/${id}`
  }

  getUserName(id: string): string {
    if (this.users === null)
      return 'null'
    for (let user of this.users!) {
      if (user.username === id)
        return user.username
    }
    return 'null'
  }

}
