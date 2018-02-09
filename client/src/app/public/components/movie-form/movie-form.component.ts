import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieFormComponent implements OnInit {
  @Input() MovieInput;
  @Output() createMovie = new EventEmitter<any>();
  error;
  movie: FormGroup;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  categories = [];
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.MovieInput)
      this.categories = [...this.categories, ...this.MovieInput.categories];
    this.movie = this._formBuilder.group({
      title: [
        (this.MovieInput && this.MovieInput.title) || '',
        Validators.required
      ],
      premiere: [
        (this.MovieInput && this.MovieInput.premiere) || '',
        Validators.required
      ],
      description: [
        (this.MovieInput && this.MovieInput.description) || '',
        Validators.required
      ]
    });
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.categories.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(category: any): void {
    let index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }
  addMovie(form) {
    if (this.movie.valid) {
      form.categories = this.categories;
      if (this.MovieInput) form._id = this.MovieInput._id;
      this.createMovie.emit(form);
    } else {
      this.error = true;
    }
  }
}
