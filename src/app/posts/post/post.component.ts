import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../shared/posts/post";
import {User} from "../../shared/users/user";
import {PostsService} from "../../shared/posts/posts.service";
import {CommentsService} from "../../shared/comments/comments.service";
import {RepliesService} from "../../shared/replies/replies.service";
import {UsersService} from "../../shared/users/users.service";
import {Comment} from "../../shared/comments/comment";
import {AuthenticationService} from "../../shared/authentication/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Reply} from "../../shared/replies/reply";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post!: Post
  comments: Array<Comment> = new Array<Comment>()
  users!: Array<User>
  newComment: Comment = new Comment()
  newReplies: Array<string> = new Array<string>()

  constructor(private activatedRoute: ActivatedRoute, private postsService: PostsService,
              private commentsService: CommentsService, private repliesService: RepliesService,
              private usersService: UsersService, public authService: AuthenticationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.usersService.getUsers().subscribe(response => {
      this.users = response
    })
    this.postsService.getPost(postId).subscribe(response => {
      this.post = response
    })
    this.reloadComments(postId)
  }

  reloadComments(postId: string) {
    this.commentsService.getCommentsByPost(postId).subscribe(response => {
      this.comments = response
      this.newReplies = new Array<string>(response.length)
      this.comments.forEach((item) => {
        this.getCommentReplies(item)
      })
    })
  }

  getCommentReplies(comment: Comment) {
    this.repliesService.getRepliesByCommentId(comment.id).subscribe(response => {
      comment.replies = response
    })
  }

  submitReview() {
    this.newComment.post_id = this.post.id
    if (localStorage.getItem("username") == null) {
      return
    }
    this.newComment.username = localStorage.getItem("username") as string
    this.commentsService.addComment(this.newComment).subscribe(() => {
      this.reloadComments(this.post.id)
      this.openSnackBar("Added comment successfully")
    })
    this.newComment = new Comment()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message)._dismissAfter(3000);
  }


  submitReply(commentId: string, reply: string) {
    if (localStorage.getItem("username") === null)
      return
    let newReply = new Reply()
    newReply.content = reply
    newReply.comment_id = commentId
    newReply.username = localStorage.getItem("username") as string
    this.repliesService.addReply(newReply).subscribe(() => {
      this.reloadComments(this.post.id)
      this.openSnackBar("Added reply successfully")
    })
  }
}
