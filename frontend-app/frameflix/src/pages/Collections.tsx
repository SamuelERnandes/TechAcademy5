import { useEffect, useState } from "react";
import { Collection } from "@/types/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const [showMoviesModal, setShowMoviesModal] = useState(false);
  const [availableMovies, setAvailableMovies] = useState<
    { id_movie: string; title: string }[]
  >([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  const { user } = useAuth();

  const fetchCollections = async () => {
    try {
      const { data } = await api.get(`/users/${user?.id}/collections`);
      const formatted = data.map((col: any) => ({
        idCollection: col.id_collection,
        name: col.name,
        userId: col.id_user,
        movies: col.movies ?? [],
      }));
      setCollections(formatted);
    } catch {
      toast.error("Erro ao buscar coleções.");
    }
  };

  const createCollection = async () => {
    if (!newName.trim()) return;
    try {
      setLoading(true);
      const { data } = await api.post(`/users/${user?.id}/collections`, {
        name: newName,
      });

      const formatted = {
        idCollection: data.id_collection,
        name: data.name,
        idUser: data.id_user,
        movies: [],
      };

      setCollections((prev) => [...prev, formatted]);
      setNewName("");
      toast.success("Coleção criada!");
    } catch {
      toast.error("Erro ao criar coleção.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      await api.delete(`/users/${user?.id}/collections/${id}`);
      setCollections((prev) => prev.filter((c) => c.idCollection !== id));
      toast.success("Coleção removida!");
    } catch {
      toast.error("Erro ao remover coleção.");
    }
  };

  const updateCollection = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await api.put(`/users/${user?.id}/collections/${id}`, { name: editName });
      setCollections((prev) =>
        prev.map((c) => (c.idCollection === id ? { ...c, name: editName } : c))
      );
      toast.success("Coleção atualizada!");
      setEditingId(null);
    } catch {
      toast.error("Erro ao atualizar coleção.");
    }
  };

  const fetchAvailableMovies = async () => {
    try {
      const { data } = await api.get("/movies");
      setAvailableMovies(data);
    } catch {
      toast.error("Erro ao buscar filmes disponíveis.");
    }
  };

  const addMovieToCollection = async (
    collectionId: string,
    movieId: string
  ) => {
    try {
      await api.post(`/collections/${collectionId}/movies`, { movieId });
      toast.success("Filme adicionado!");
      fetchCollections();
      setShowMoviesModal(false);
    } catch {
      toast.error("Erro ao adicionar filme.");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="p-8 bg-slate-800 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Minhas Coleções</h1>

      <div className="flex gap-2 mb-6 items-center">
        <Input
          placeholder="Nome da nova coleção"
          value={newName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewName(e.target.value)
          }
        />
        <Button onClick={createCollection} disabled={loading}>
          Criar
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.idCollection}
            className="bg-white rounded-lg shadow p-4 border text-black"
          >
            {editingId === collection.idCollection ? (
              <>
                <Input
                  value={editName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditName(e.target.value)
                  }
                  className="border border-slate-600"
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => updateCollection(collection.idCollection)}
                    className="bg-teal-600"
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    className="bg-teal-600"
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">{collection.name}</h2>
                <p className="text-sm text-gray-600">
                  {collection.movies?.length ?? 0} filme(s)
                </p>
                <div className="flex gap-2 mt-4 flex-wrap">
                  <Button
                    variant="default"
                    onClick={() => {
                      setEditName(collection.name);
                      setEditingId(collection.idCollection);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCollection(collection.idCollection)}
                  >
                    Excluir
                  </Button>
                  <Button
                    className="bg-slate-700 text-white hover:bg-slate-600"
                    onClick={() => {
                      setSelectedCollection(collection.idCollection);
                      fetchAvailableMovies();
                      setShowMoviesModal(true);
                    }}
                  >
                    Filmes
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Modal de seleção de filmes */}
      {showMoviesModal && selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">
              Selecionar Filme
            </h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {availableMovies.map((movie) => (
                <li
                  key={movie.id_movie}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-black">{movie.title}</span>
                  <Button
                    onClick={() =>
                      addMovieToCollection(selectedCollection, movie.id_movie)
                    }
                  >
                    Adicionar
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowMoviesModal(false)}
                className="text-white"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
