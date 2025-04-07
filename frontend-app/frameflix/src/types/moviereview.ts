export type MovieReview = {
  id: string;
  movieId: string;
  rating: number;
  comment: string;
  createdAt: string;
  movie: {
    id: string;
    title: string;
    posterUrl: string;
  };
};
