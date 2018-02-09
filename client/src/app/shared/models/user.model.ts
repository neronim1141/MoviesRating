import { Movie } from './movie.model';
import { Rating } from './rating.model';
import { Review } from './review.model';
import { Like } from './like.model';

export interface User {
  _id?: string;
  role?: string;
  login?: string;
  email?: string;
  movies?: Movie[];
  ratings?: Rating[];
  reviews?: Review[];
  likes?: Like[];
}
