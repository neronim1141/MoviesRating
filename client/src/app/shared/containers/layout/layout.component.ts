import { Component, OnInit } from '@angular/core';
import { LayoutSandbox } from './layout.sandbox';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(public sandbox: LayoutSandbox) {}

  ngOnInit() {}
}
