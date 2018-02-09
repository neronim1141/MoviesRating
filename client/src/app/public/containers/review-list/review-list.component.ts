import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewListComponent {
  @Input() list;
  @Input() User;
  @Output() editReview = new EventEmitter<any>();
  @Output() removeReview = new EventEmitter<any>();

  Math: Math = Math;

  author(userId) {
    if (this.User && this.User.role == 'admin') return true;
    if (this.User) return this.User._id == userId;
    return false;
  }
}
