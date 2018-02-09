import { Component, OnInit } from '@angular/core';

import { CreateSandbox } from './create.sandbox';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [CreateSandbox]
})
export class CreateComponent {
  constructor(private sandbox: CreateSandbox) {}
}
