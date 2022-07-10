import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../shared/posts/post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post!: Post
  comments!: Array<Comment>

  constructor(private activatedRoute: ActivatedRoute) {
    // test post
    this.post = new Post()
    this.post.user_id = 'test user id'
    this.post.title = 'this is how the post title will look like'
    this.post.content = 'and this is how the content will look like, and this is how the content will look like, and this is how the content will look like, and this is how the content will look like'
    this.post.date_created = '10/07/2022'
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params['postId'];
    // test post
    this.post.id = postId
  }

}
