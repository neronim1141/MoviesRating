import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeComponent {
  @Input() count;
  @Input() logged;
  @Input() isLiked;
  @Output() like = new EventEmitter<any>();
}
