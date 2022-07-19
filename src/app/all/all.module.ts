import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AllRoutingModule} from './all-routing.module';
import {AllComponent} from './all.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";


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
        MatProgressBarModule
    ]
})
export class AllModule {
}
