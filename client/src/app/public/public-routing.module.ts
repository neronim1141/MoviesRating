import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PublicComponent } from './public.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MovieExistsGuards } from './guards/movie-exist.guard';
import { MovieGuard } from './guards/movie.guard';
import { CreateComponent } from './pages/create/create.component';
// import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateComponent } from './pages/update/update.component';
import { AuthGuardIsLogged } from '../Auth/guards/auth.guard';
import { RatingListComponent } from './containers/rating-list/rating-list.component';
import { ReviewListComponent } from './containers/review-list/review-list.component';
import { MovieGuardIsAuthor } from './guards/movie-author.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,

    children: [
      {
        path: '',
        canActivate: [MovieGuard],
        component: HomeComponent
      },

      {
        path: 'movie/add',
        canActivate: [AuthGuardIsLogged],
        component: CreateComponent
      },
      {
        path: 'movie/update/:MovieId',
        canActivate: [AuthGuardIsLogged, MovieExistsGuards, MovieGuardIsAuthor],
        component: UpdateComponent
      },
      {
        path: 'movie/:MovieId',
        canActivate: [MovieExistsGuards],
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MovieExistsGuards, MovieGuard, MovieGuardIsAuthor]
})
export class PublicRoutingModule {}
