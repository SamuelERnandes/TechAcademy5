import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=SUA_CHAVE_TMDB"
  );
  return response.data.results as Movie[];
};
