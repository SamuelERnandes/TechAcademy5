import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/services/api";

const UserProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put(`/users/${user?.id}`, { name, email });
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Perfil do Usuário
        </h1>

        <label className="block mb-2 text-sm text-gray-300">Nome:</label>
        <Input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="mb-4"
        />

        <label className="block mb-2 text-sm text-gray-300">Email:</label>
        <Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="mb-4"
        />

        <label className="block mb-2 text-sm text-gray-300">ID:</label>
        <Input value={user?.id.toString()} disabled className="mb-6" />

        <Button onClick={handleSave} className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
