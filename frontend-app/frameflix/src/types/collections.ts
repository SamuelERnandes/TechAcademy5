import { Movie } from "./movie";

export type Collection = {
  idCollection: string;
  name: string;
  idUser: string;
  movies: Movie[];
};
