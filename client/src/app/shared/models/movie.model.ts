export interface Movie {
  _id: string;
  title: String;
  likesCount: number;
  userId: {
    login: string;
    _id: string;
  };
}
