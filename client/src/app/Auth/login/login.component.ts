import { Component, OnInit } from '@angular/core';
import { LogInSandbox } from './login.sandbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  <mat-card>
  <mat-toolbar color="accent">{{'AUTH.LOG.TITLE'|translate}}</mat-toolbar>
  <mat-card-content>

    <form fxLayout="column" [formGroup]="LoginGroup">
    <mat-error  *ngIf="sandbox.error">{{sandbox.error}}</mat-error>
      <mat-form-field>
        <input matInput placeholder="{{'AUTH.LOG.PLACEHOLDER.LOGIN'|translate}}" formControlName="login" (keydown.enter)="logIn(this.LoginGroup.value)">
      </mat-form-field>

      <mat-form-field>
        <input matInput type="password" placeholder="{{'AUTH.LOG.PLACEHOLDER.PASSWORD'|translate}}" formControlName="password" (keydown.enter)="logIn(this.LoginGroup.value)">
      </mat-form-field>
    </form>
  </mat-card-content>
  <mat-card-actions fxLayoutAlign="space-around center">
    <button mat-raised-button color="accent" (click)="logIn(this.LoginGroup.value)">{{'AUTH.LOG.IN'|translate}}</button>
    <button mat-raised-button color="warn" (click)="sandbox.cancel()">{{'CANCEL'|translate}}</button>
  </mat-card-actions>

</mat-card>
`,
  styles: [
    `
  mat-card {
    max-width: 500px;
    margin: 10px auto;
}

`
  ],
  providers: [LogInSandbox]
})
export class LoginComponent implements OnInit {
  LoginGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private sandbox: LogInSandbox
  ) {}

  ngOnInit() {
    this.LoginGroup = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  logIn(form) {
    if (this.LoginGroup.valid) {
      this.sandbox.logIn(form);
    } else {
      this.sandbox.error = 'Wypelnij Poprawnie Formularz';
    }
  }
}
