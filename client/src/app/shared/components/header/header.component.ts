import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() selectedLanguage: string;
  @Input() availableLanguages: Array<any>;

  @Output() selectLanguage: EventEmitter<any> = new EventEmitter();
  @Output() openSidenav: EventEmitter<any> = new EventEmitter();
}
