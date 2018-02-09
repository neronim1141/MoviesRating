export interface Rating {
  _id?: string;
  movieId?: string;
  userId?: string;
  creationTime?: Date;
  rating?: Number;
  description: string;
}
