import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const { data } = await api.get("/movies");
      setMovies(data);
    } catch {
      toast.error("Erro ao buscar filmes.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const goToMovie = (id: string) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Filmes disponíveis</h1>

      {movies.length === 0 ? (
        <p className="text-gray-500">Nenhum filme encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => goToMovie(movie.id)}
              className="bg-white rounded shadow hover:shadow-md cursor-pointer transition p-2"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover rounded"
              />
              <div className="mt-2">
                <h2 className="font-semibold text-base">{movie.title}</h2>
                <p className="text-sm text-gray-500">Nota: {movie.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
