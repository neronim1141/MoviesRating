import { Component, OnInit, Input, Output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingListComponent {
  @Input() list;
  @Input() User;
  @Output() editRating = new EventEmitter<any>();
  @Output() removeRating = new EventEmitter<any>();

  Math: Math = Math;

  author(userId) {
    if (this.User && this.User.role == 'admin') return true;
    if (this.User) return this.User._id == userId;
    return false;
  }
}
