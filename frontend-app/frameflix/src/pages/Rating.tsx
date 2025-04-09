import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/ui/rating";
import { toast } from "sonner";
import api from "@/services/api";

type Movie = {
  id: string;
  title: string;
};

const RatingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const { data } = await api.get("/movies");
      setMovies(data);
    } catch {
      toast.error("Erro ao carregar filmes.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async () => {
    if (!selectedMovieId) {
      toast.error("Selecione um filme.");
      return;
    }

    if (rating === 0) {
      toast.error("Por favor, adicione uma pontuação.");
      return;
    }

    try {
      await api.post(`/movies/${selectedMovieId}/rating`, { rating, comment });
      toast.success("Avaliação enviada!");
      navigate("/movies");
    } catch {
      toast.error("Erro ao enviar avaliação.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 text-white px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Avaliar Filme</h1>

        <label className="text-sm text-gray-300 mb-2 block" htmlFor="movie">
          Selecione um filme
        </label>
        <select
          id="movie"
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-slate-700 text-white"
        >
          <option value="">-- Escolha um filme --</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>

        <div className="mb-6 flex justify-center">
          <Rating value={rating} onChange={setRating} />
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <label className="text-sm text-gray-400" htmlFor="comment">
            Comentário
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            className="bg-slate-800 text-white p-3 rounded border border-slate-700"
            rows={5}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full bg-teal-500">
          Enviar Avaliação
        </Button>
      </div>
    </div>
  );
};

export default RatingPage;
