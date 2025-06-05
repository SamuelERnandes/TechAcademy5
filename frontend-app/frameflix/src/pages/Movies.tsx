// No frontend (React)
import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";
import { toast } from "sonner";
import api from "@/services/api";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMovies = async () => {
    try {
      console.log(movies);
      const { data } = await api.get("/movies");
      setMovies(data);
      console.log(data);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id_movie}
            className="bg-slate-900 rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`http://localhost:3000/assets/public/posters/${movie.poster}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-36">
              <div>
                <h3 className="font-bold text-lg mb-1 truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Nota: {movie.rating ?? "-"} / 5
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedMovie(movie);
                  setShowModal(true);
                }}
                className="mt-3 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition w-full"
              >
                Assistir
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-lg p-6 w-[90%] max-w-3xl relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white text-xl hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {selectedMovie.title}
            </h2>
            <video controls className="w-full rounded">
              <source
                src={`http://localhost:3000/assets/public/videos/${selectedMovie.videoFile}`}
                type="video/mp4"
              />
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
