export type PublicMovieReview = {
  id: string;
  movieId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  movie: {
    id: string;
    title: string;
    posterUrl: string;
  };
};
