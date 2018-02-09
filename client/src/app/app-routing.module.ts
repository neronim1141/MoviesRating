import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Errors/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './Errors/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './public/public.module#PublicModule'
  },
  {
    path: '',
    loadChildren: './Auth/auth.module#AuthModule'
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
