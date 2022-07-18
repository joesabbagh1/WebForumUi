import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Post} from "../../shared/posts/post";
import {AuthenticationService} from "../../shared/authentication/authentication.service";
import {PostsService} from "../../shared/posts/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newPost: Post

  constructor(private authService: AuthenticationService,
              private postsService: PostsService,
              private router: Router) {
    this.newPost = new Post()
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.authService.isUserAuthenticated()) {
      // @ts-ignore
      this.newPost.username = localStorage.getItem("username")
      this.postsService.addPost(this.newPost).subscribe(() => {
        return this.router.navigate(['/all']).then();
      })
    }
  }
}
