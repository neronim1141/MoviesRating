import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() logged;
  @Output() logout = new EventEmitter<any>();
}
