import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(module => module.PostModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then(module => module.NewModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
