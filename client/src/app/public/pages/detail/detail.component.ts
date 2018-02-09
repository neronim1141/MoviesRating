import { Component, OnInit } from '@angular/core';
import { DetailSandbox } from './detail.sandbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RatingFormComponent } from '../../components/rating-form/rating-form.component';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailSandbox]
})
export class DetailComponent implements OnInit {
  constructor(private sandbox: DetailSandbox, public dialog: MatDialog) {}

  ngOnInit() {}

  addRating(id) {
    if (this.sandbox.loggedUser) {
      let dialogRef = this.dialog.open(RatingFormComponent, {
        data: {
          movieId: id,
          userId: this.sandbox.loggedUser._id,
          rating: 1,
          description: ''
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sandbox.addRating(result);
        }
      });
    }
  }
  editRating(data) {
    let dialogRef = this.dialog.open(RatingFormComponent, {
      data: {
        ...data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.sandbox.editRating(result);
      }
    });
  }
  addReview(id) {
    if (this.sandbox.loggedUser) {
      let dialogRef = this.dialog.open(ReviewFormComponent, {
        data: {
          movieId: id,
          userId: this.sandbox.loggedUser._id,
          rating: 1,
          musicRating: 1,
          actorsRating: 1,
          viewRating: 1,
          description: ''
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sandbox.addReview(result);
        }
      });
    }
  }
  editReview(data) {
    let dialogRef = this.dialog.open(ReviewFormComponent, {
      data: {
        ...data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.sandbox.editReview(result);
      }
    });
  }
}
