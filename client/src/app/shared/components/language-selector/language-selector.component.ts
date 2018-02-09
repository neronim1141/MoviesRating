import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent implements OnInit {
  @Input() selectedLanguage: any;
  @Input() availableLanguages: Array<any>;
  @Output() select: EventEmitter<any> = new EventEmitter();
  lang: any;
  /**
   * Additional function to compare because Languages are Objects
   */
  compareByCode: ((lang1: any, lang2: any) => boolean) | null = (
    lang1: any,
    lang2: any
  ) => {
    return lang1 && lang2 && lang1.code === lang2.code;
  };

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.lang = this.selectedLanguage;
  }
}
