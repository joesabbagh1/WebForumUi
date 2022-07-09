import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Post} from "../../shared/posts/post";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newPost: Post

  constructor() {
    this.newPost = new Post()
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      // set user ID here

    }
  }
}
