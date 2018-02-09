import { Component, OnInit } from '@angular/core';
import { UpdateSandbox } from './update.sandbox';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [UpdateSandbox]
})
export class UpdateComponent {
  constructor(private sandbox: UpdateSandbox) {}
}
