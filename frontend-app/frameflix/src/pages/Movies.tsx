// No frontend (React)
import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { toast } from "sonner";
import api from "@/services/api";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async () => {
    try {
      const { data } = await api.get("/movies"); // Busca filmes do backend
      setMovies(data);
    } catch {
      toast.error("Erro ao buscar filmes.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="p-8 bg-slate-800 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Filmes disponíveis</h1>

      {/* Exibe o Player de Vídeo apenas se um filme for selecionado */}
      {selectedMovie && (
        <div className="mb-6">
          <video width="800" height="450" controls>
            <source
              src={`http://localhost:3000/movies/${selectedMovie.id}`}
              type="video/mp4"
            />
            Seu navegador não suporta vídeos HTML5.
          </video>
        </div>
      )}

      {movies.length === 0 ? (
        <p className="text-gray-500">Nenhum filme encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)} // Ao clicar, exibe o vídeo
              className="bg-slate-800 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition p-4"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h2 className="font-semibold text-base">{movie.title}</h2>
                <p className="text-sm text-gray-300">Nota: {movie.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
