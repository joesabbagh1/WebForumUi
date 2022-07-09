import {Component, OnInit} from '@angular/core';
import {Post} from "../shared/posts/post";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  posts: Array<Post>

  constructor() {
    this.posts = new Array<Post>()
    let post = new Post()
    post.user_id = 'user ID'
    post.id = 'ID'
    post.date_created = 'Date created'
    post.content = 'Et distinctio earum qui vel pariatur aut. Nisi cum ea ut dolorem consectetur sunt laboriosam cum. Facilis et corporis est. Enim perferendis eaque ab aut magnam incidunt non. Vel accusamus modi magnam sapiente aspernatur dolorum sint'
    post.title = 'this is a post'
    this.posts.push(post)

    post = new Post()
    post.user_id = 'user ID'
    post.id = 'ID'
    post.date_created = 'Date created'
    post.content = 'These elements primary serve as pre-styled content containers without any additional APIs. However, the align property on <mat-card-actions> can be used to position the actions at the \'start\' or \'end\' of the container.\n' +
      'Card headers\n' +
      '\n' +
      'In addition to the aforementioned sections, <mat-card-header> gives the ability to add a rich header to a card. This header can contain'
    post.title = 'this is another unrelated post'
    this.posts.push(post)
  }

  ngOnInit(): void {
  }

  getPostUri(id: string): string {
    return `../posts/post/${id}`
  }

}
