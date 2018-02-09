import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter
} from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { Output } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {
  @Input() Movie: Movie;
  @Input() User;
  @Input() likes;

  @Output() remove = new EventEmitter<any>();
  @Output() addReview = new EventEmitter<any>();
  @Output() editReview = new EventEmitter<any>();
  @Output() removeReview = new EventEmitter<any>();
  @Output() addRating = new EventEmitter<any>();
  @Output() editRating = new EventEmitter<any>();
  @Output() removeRating = new EventEmitter<any>();
  @Output() like = new EventEmitter<any>();

  author() {
    if (this.User && this.User.role == 'admin') return true;
    if (this.User && this.Movie) return this.User._id == this.Movie.userId._id;
    return false;
  }
  isLiked(): boolean {
    if (this.likes && this.likes[this.Movie._id]) {
      return true;
    }
    return false;
  }
}
