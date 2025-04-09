import { useEffect, useState } from "react";
import { Collection } from "@/types/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/services/api";

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCollections = async () => {
    try {
      const { data } = await api.get("/collection");
      const formatted = data.map((col: any) => ({
        id: col.id_collection,
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
      const { data } = await api.post("/collection", { name: newName });

      const formatted = {
        id: data.id_collection,
        name: data.name,
        userId: data.id_user,
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
      await api.delete(`/collection/${id}`);
      setCollections((prev) => prev.filter((c) => c.id !== id));
      toast.success("Coleção removida!");
    } catch {
      toast.error("Erro ao remover coleção.");
    }
  };

  const updateCollection = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await api.put(`/collection/${id}`, { name: editName });
      setCollections((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: editName } : c))
      );
      toast.success("Coleção atualizada!");
      setEditingId(null);
    } catch {
      toast.error("Erro ao atualizar coleção.");
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
            key={collection.id}
            className="bg-white rounded-lg shadow p-4 border"
          >
            {editingId === collection.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditName(e.target.value)
                  }
                  className="text-black border border-slate-600"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => updateCollection(collection.id)}
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
                <h2 className="text-lg text-gray-800 font-semibold">
                  {collection.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {collection.movies?.length ?? 0} filme(s)
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      setEditName(collection.name);
                      setEditingId(collection.id);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCollection(collection.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
