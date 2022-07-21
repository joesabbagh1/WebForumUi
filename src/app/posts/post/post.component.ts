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
  comments: Array<Comment> = new Array<Comment>()
  commentReplies!: Map<string, Array<Reply>>
  commentNewReplies!: Array<Reply>
  users!: Array<User>
  newComment: Comment = new Comment()

  constructor(private activatedRoute: ActivatedRoute, private postsService: PostsService,
              private commentsService: CommentsService, private repliesService: RepliesService,
              private usersService: UsersService, public authService: AuthenticationService) {
    this.newComment.content = '' // initialize to avoid errors when checking length
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postsService.getPost(postId).subscribe(response => {
      this.post = response
    })
    this.reloadComments(postId)
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
  }

  reloadComments(postId: string) {
    this.commentsService.getCommentsByPost(postId).subscribe(response => {
      this.comments = response
      this.comments.forEach((item) => {
        this.getCommentReplies(item.id)
      })
    })
  }

  getCommentReplies(commentId: string) {
    this.repliesService.getRepliesByCommentId(commentId).subscribe(response => {
      this.commentReplies.set(commentId, response)
    })
  }

  submitReview() {
    this.newComment.post_id = this.post.id
    if (localStorage.getItem("username") == null) {
      return
    }
    this.newComment.username = localStorage.getItem("username") as string
    this.commentsService.addComment(this.newComment).subscribe()
    this.reloadComments(this.post.id)
    this.newComment = new Comment()
  }
}
