import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AllRoutingModule} from './all-routing.module';
import {AllComponent} from './all.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AllComponent
  ],
  imports: [
    CommonModule,
    AllRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class AllModule {
}
