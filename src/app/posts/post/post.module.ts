import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostComponent} from './post.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    PostComponent
  ],
    imports: [
        CommonModule,
        PostRoutingModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class PostModule {
}
