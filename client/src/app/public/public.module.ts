import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { MaterialModule } from '../shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { MoviesService } from '../shared/asyncServices/movies.service';
import { HomeComponent } from './pages/home/home.component';
import { MoviesListComponent } from './containers/movies-list/movies-list.component';

import { MovieDetailComponent } from './containers/movie-detail/movie-detail.component';
import { PublicComponent } from './public.component';
import { MoviePreviewComponent } from './components/movie-preview/movie-preview.component';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';
import { DetailComponent } from './pages/detail/detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreateComponent } from './pages/create/create.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { UpdateComponent } from './pages/update/update.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { RatingFormComponent } from './components/rating-form/rating-form.component';
import { RatingListComponent } from './containers/rating-list/rating-list.component';
import { ReviewListComponent } from './containers/review-list/review-list.component';
// import { ProfileComponent } from './pages/profile/profile.component';
import { AuthService } from '../shared/asyncServices/auth.service';
import { LikeService } from '../shared/asyncServices/like.service';
import { LikeComponent } from './components/like/like.component';
import { RatingComponent } from './components/rating/rating.component';
import { RatingsService } from '../shared/asyncServices/ratings.service';
import { ReviewsService } from '../shared/asyncServices/reviews.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepeatDirective } from '../shared/directives/repeat.directive';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    StoreModule.forFeature('public', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    HomeComponent,
    MoviesListComponent,
    MovieDetailComponent,
    MoviePreviewComponent,
    PublicComponent,
    TruncatePipe,
    RepeatDirective,
    DetailComponent,
    CreateComponent,
    MovieFormComponent,
    UpdateComponent,
    ReviewFormComponent,
    RatingFormComponent,
    RatingListComponent,
    ReviewListComponent,
    LikeComponent,
    RatingComponent
  ],
  entryComponents: [ReviewFormComponent, RatingFormComponent],
  providers: [MoviesService, RatingsService, ReviewsService]
})
export class PublicModule {}
