import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../shared/posts/post";
import {Reply} from "../../shared/replies/reply";
import {User} from "../../shared/users/user";
import {PostsService} from "../../shared/posts/posts.service";
import {CommentsService} from "../../shared/comments/comments.service";
import {RepliesService} from "../../shared/replies/replies.service";
import {UsersService} from "../../shared/users/users.service";
import {Comment} from "../../shared/comments/comment";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post!: Post
  comments!: Array<Comment>
  replies!: Array<Reply>
  users!: Array<User>

  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private commentsService: CommentsService,
              private repliesService: RepliesService,
              private usersService: UsersService) {

  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postsService.getPost(postId).subscribe(response => {
      this.post = response
    })
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
    this.commentsService.getComments().subscribe(response => {
      this.comments = response
    })
    this.repliesService.getReplies().subscribe(response => {
      this.replies = response
    })
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
