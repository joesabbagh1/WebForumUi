import {Component, OnDestroy, OnInit} from '@angular/core'
import {Post} from "../shared/posts/post"
import {PostsService} from "../shared/posts/posts.service"
import {User} from "../shared/users/user"
import {UsersService} from "../shared/users/users.service"
import {BaseApiParams} from "../shared/base-api-params"
import {debounceTime, distinctUntilChanged, Subject, Subscription} from "rxjs"
import {FormControl, FormGroup} from "@angular/forms";

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

  range: FormGroup

  constructor(private postsService: PostsService,
              private usersService: UsersService) {
    this.baseApiParams = new BaseApiParams()
    this.subscriptions = new Subscription()
    this.searchSubject = new Subject<string>()

    this.range = new FormGroup({
      // @ts-ignore
      start: new FormControl<Date | null>(null),
      // @ts-ignore
      end: new FormControl<Date | null>(null),
    })
  }

  ngOnInit(): void {
    this.reloadPosts()
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
    this.subscriptions.add(this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(() => {
        if (!this.baseApiParams.request) {
          delete this.baseApiParams.request
        }
        this.reloadPosts()
      }
    ))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  reloadPosts() {
    this.postsService.getPosts(this.baseApiParams).subscribe(response => {
      this.posts = response
    })
  }

  onSearchChanged() {
    if (this.baseApiParams.request != null) {
      this.searchSubject.next(this.baseApiParams.request)
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

  clearFilters() {
    delete this.baseApiParams.startDate
    delete this.baseApiParams.endDate
    delete this.baseApiParams.username
  }

  filterByDate(dateFormValue: any) {
    const input = {...dateFormValue}
    this.baseApiParams.startDate = this.parseDate(input.start)
    this.baseApiParams.endDate = this.parseDate(input.end)
    this.reloadPosts()
  }

  parseDate(date: Date) {
    let localeDateString: string = date.toLocaleDateString()
    // MM/DD/YYYY or M/D/YYYY so need to check in case needs adding 0
    let splitString: Array<string> = localeDateString.split('/')

    let parsedDate: string = ''
    parsedDate += splitString[2] + '-'
    if (splitString[0].length === 1)
      parsedDate += '0' + splitString[0] + '-'
    else parsedDate += splitString[0] + '-'

    if (splitString[1].length === 1)
      parsedDate += '0' + splitString[1]
    else parsedDate += splitString[1]

    return parsedDate
  }
}
