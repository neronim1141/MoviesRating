import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  @Input() list: Movie[];
  @Input() size: number;
  @Input() page: number;
  @Input() userLikes;
  @Input() userLogged;
  @Input() pageSize: number;
  @Output() changePage = new EventEmitter<any>();
  @Output() like = new EventEmitter<any>();

  isLiked(id: string): boolean {
    if (this.userLikes && this.userLikes[id]) {
      return true;
    }
    return false;
  }
}
