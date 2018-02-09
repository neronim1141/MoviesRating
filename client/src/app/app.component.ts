import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromStore from './shared/store';
import { Observable } from 'rxjs/Observable';
import { AppSandbox } from './app.sandox';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppSandbox]
})
export class AppComponent implements OnInit {
  constructor(
    public appSandbox: AppSandbox,
    private store: Store<fromStore.AppState>
  ) {
    this.appSandbox.setupLanguage();
  }
  ngOnInit() {}
}
