import { Component, OnInit } from '@angular/core';
import { PageNotFoundSandbox } from './page-not-found.sandbox';

@Component({
  selector: 'app-page-not-found',
  template: `
  <mat-card>
  <mat-toolbar color="warn">{{'ERRORS.404'|translate}}</mat-toolbar>
  <mat-card-actions fxLayout="row" fxLayoutAlign="space-around center" >
    <button mat-raised-button color="warn" (click)="sandbox.routerBack()" >{{'ERRORS.BACK'|translate}}</button>
    <button mat-raised-button color="warn" (click)="sandbox.routerGo({ path: [''] })">{{'ERRORS.HOME'|translate}}</button>
  </mat-card-actions>
</mat-card>
`,
  styles: [
    `
  mat-card{
    max-width:960px;
    margin: 10px auto;
  }`
  ],
  providers: [PageNotFoundSandbox]
})
export class PageNotFoundComponent implements OnInit {
  constructor(private sandbox: PageNotFoundSandbox) {}

  ngOnInit() {}
}
