import { Component, OnInit } from '@angular/core';
import { ForbiddenSandbox } from './forbidden.sandbox';

@Component({
  selector: 'Forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  providers: [ForbiddenSandbox]
})
export class ForbiddenComponent implements OnInit {
  constructor(private sandbox: ForbiddenSandbox) {}

  ngOnInit() {}
}
