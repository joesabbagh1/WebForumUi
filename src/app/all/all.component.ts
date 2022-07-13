import {Component, OnInit} from '@angular/core';
import {Post} from "../shared/posts/post";
import {PostsService} from "../shared/posts/posts.service";
import {User} from "../shared/users/user";
import {UsersService} from "../shared/users/users.service";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  posts?: Array<Post>
  users?: Array<User>


  constructor(private postsService: PostsService,
              private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(response => {
      this.posts = response
    })
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
  }

  getPostUri(id: string): string {
    return `../posts/post/${id}`
  }

  getUserName(id: string): string {
    if (this.users === null)
      return 'null'
    for (let user of this.users!) {
      if (user.id === id)
        return user.username
    }
    return 'null'
  }

}
