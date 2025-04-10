import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/ui/rating";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

type RatingData = {
  id_rating: string;
  id_movie: number;
  id_user: number;
  film_title: string; // supondo que você está populando o título
  comment: string;
  rating: number;
};

const MyRatings = () => {
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedRating, setEditedRating] = useState<number>(0);
  const [editedComment, setEditedComment] = useState("");
  const { user } = useAuth();
  console.log("Usuário logado:", user);

  const fetchRatings = async () => {
    try {
      const { data } = await api.get("/ratings/mine"); // endpoint de avaliações do usuário
      setRatings(data);
    } catch {
      toast.error("Erro ao carregar suas avaliações.");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleEdit = (rating: RatingData) => {
    setEditingId(rating.id_rating);
    setEditedRating(rating.rating);
    setEditedComment(rating.comment);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedRating(0);
    setEditedComment("");
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/ratings/${editingId}`, {
        rating: editedRating,
        comment: editedComment,
      });
      toast.success("Avaliação atualizada!");
      handleCancel();
      fetchRatings();
    } catch {
      toast.error("Erro ao atualizar avaliação.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/ratings/${id}`);
      toast.success("Avaliação removida!");
      fetchRatings();
    } catch {
      toast.error("Erro ao remover avaliação.");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-slate-800 text-white">
      <h1 className="text-4xl font-bold mb-6">Minhas Avaliações</h1>

      <div className="flex flex-col gap-6">
        {ratings.map((r) =>
          editingId === r.id_rating ? (
            <div key={r.id_rating} className="border p-4 rounded bg-slate-700">
              <h2 className="font-semibold">{r.film_title}</h2>
              <Rating value={editedRating} onChange={setEditedRating} />
              <Textarea
                id={`comment-${r.id_rating}`}
                placeholder="Escreva seu comentário..."
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="mt-2"
              />
              <div className="flex gap-2 mt-2">
                <Button onClick={handleUpdate}>Salvar</Button>
                <Button variant="destructive" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div key={r.id_rating} className="border p-4 rounded bg-slate-800">
              <h2 className="font-semibold">{r.film_title}</h2>
              <p className="text-sm text-gray-400">Nota: {r.rating}/5</p>
              <p className="text-gray-300">{r.comment}</p>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleEdit(r)}>Editar</Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(r.id_rating)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyRatings;
