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
import {AuthenticationService} from "../../shared/authentication/authentication.service";

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
  newComment: Comment = new Comment()

  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private commentsService: CommentsService,
              private repliesService: RepliesService,
              private usersService: UsersService,
              public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postsService.getPost(postId).subscribe(response => {
      this.post = response
    })
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
    this.repliesService.getReplies().subscribe(response => {
      this.replies = response
    })
    this.reloadComments()
  }

  reloadComments() {
    this.commentsService.getCommentsByPost(this.post.id).subscribe(response => {
      this.comments = response
    })
  }

  submitReview() {
    this.newComment.post_id = this.post.id
    if (localStorage.getItem("username") == null)
      return
    this.newComment.username = localStorage.getItem("username") as string
    this.commentsService.addComment(this.newComment).subscribe()
    this.reloadComments()
    this.newComment = new Comment()
  }
}
