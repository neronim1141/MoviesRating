import { Component, OnInit } from '@angular/core';
import { RegisterSandbox } from './register.sandbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
  <mat-card>
  <mat-toolbar color="accent">{{'AUTH.REGISTER.TITLE'|translate}}</mat-toolbar>
  <mat-card-content>
    <form fxLayout="column" [formGroup]="RegisterGroup">
    <mat-error  *ngIf="error">{{'AUTH.REGISTER.ERROR'|translate}}</mat-error>
    <mat-form-field>
    <input matInput placeholder="{{'AUTH.REGISTER.PLACEHOLDER.LOGIN'|translate}}" formControlName="login">
    <mat-error *ngIf="RegisterGroup.controls.login.invalid">{{getErrorMessage(RegisterGroup.controls.login)}}</mat-error>
  </mat-form-field>
      <mat-form-field>
        <input matInput type="{{'AUTH.REGISTER.PLACEHOLDER.EMAIL'|translate}}" placeholder="email" formControlName="email">
        <mat-error *ngIf="RegisterGroup.controls.email.invalid">{{getErrorMessage(RegisterGroup.controls.email)}}</mat-error>
      </mat-form-field>

      <mat-form-field>
        <input matInput type="{{'AUTH.REGISTER.PLACEHOLDER.PASSWORD'|translate}}" placeholder="Hasło" formControlName="password">
    <mat-error *ngIf="RegisterGroup.controls.password.invalid">{{getErrorMessage(RegisterGroup.controls.password)}}</mat-error>

      </mat-form-field>
      <mat-form-field>
        <input matInput type="password" placeholder=" {{'AUTH.REGISTER.PLACEHOLDER.REPEAT'|translate}}" formControlName="password2">
    <mat-error *ngIf="RegisterGroup.controls.password2.invalid">{{getErrorMessage(RegisterGroup.controls.password2)}}</mat-error>

      </mat-form-field>
    </form>
  </mat-card-content>
  <mat-card-actions fxLayoutAlign="space-around center">
    <button mat-raised-button color="accent" (click)="register(RegisterGroup.value)" >{{'AUTH.REGISTER.SIGNIN'|translate}}</button>
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
  providers: [RegisterSandbox]
})
export class RegisterComponent implements OnInit {
  error: boolean;
  RegisterGroup: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private sandbox: RegisterSandbox
  ) {}

  ngOnInit() {
    this.RegisterGroup = this._formBuilder.group(
      {
        login: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', Validators.required]
      },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      }
    );
  }
  getErrorMessage(control) {
    return control.hasError('required')
      ? 'You must enter a value'
      : control.hasError('email')
        ? 'Not a valid email'
        : control.hasError('MatchPassword') ? "Passwords Don't match" : '';
  }
  register(form) {
    if (this.RegisterGroup.valid) {
      this.sandbox.register(form);
    } else {
      this.error = true;
    }
  }
}

import { AbstractControl } from '@angular/forms';
export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('password2').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('password2').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
