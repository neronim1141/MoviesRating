import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviePreviewComponent {
  @Input() Movie: Movie;
  @Input() isLiked: boolean;
  @Input() logged: boolean;
  @Output() like = new EventEmitter<any>();
}
