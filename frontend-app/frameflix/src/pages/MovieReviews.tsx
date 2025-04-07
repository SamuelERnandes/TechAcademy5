import { useEffect, useState } from "react";
import { MovieReview } from "@/types/moviereview";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import api from "@/services/api";

const MovieReviews = () => {
  const [reviews, setReviews] = useState<MovieReview[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/reviews");
      setReviews(data);
    } catch {
      toast.error("Erro ao buscar avaliações.");
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await axios.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Avaliação removida!");
    } catch {
      toast.error("Erro ao remover a avaliação.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Minhas Avaliações</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">Você ainda não avaliou nenhum filme.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded shadow border flex gap-4"
            >
              <img
                src={review.movie.posterUrl}
                alt={review.movie.title}
                className="w-24 h-36 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{review.movie.title}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  Avaliação: <strong>{review.rating}/5</strong>
                </p>
                <p className="text-sm italic text-gray-800">
                  “{review.comment}”
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Publicado em {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  variant="destructive"
                  onClick={() => deleteReview(review.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
