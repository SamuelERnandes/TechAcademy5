import { Movie } from "./movie";

export type Collection = {
  id: string;
  name: string;
  userId: string;
  movies: Movie[];
};
