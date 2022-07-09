import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewRoutingModule} from './new-routing.module';
import {NewComponent} from './new.component';
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule
  ]
})
export class NewModule {
}
