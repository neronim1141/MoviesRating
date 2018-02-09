import { Component, OnInit } from '@angular/core';
import { HomeSandbox } from './home.sandbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeSandbox]
})
export class HomeComponent implements OnInit {
  constructor(private sandbox: HomeSandbox) {}

  ngOnInit() {}
}
