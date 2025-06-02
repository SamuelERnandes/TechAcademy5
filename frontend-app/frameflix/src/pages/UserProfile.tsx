import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/services/api";

const UserProfile = () => {
  const { user } = useAuth();

  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }

    if (password.trim() && password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      const payload: any = {
        name,
      };

      if (password.trim()) {
        payload.password = password;
      }

      await api.put(`/users/${user?.id}`, payload);

      toast.success("Perfil atualizado com sucesso!");
      setPassword("");
      setConfirmPassword("");
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
          className="mb-1"
        />
        {name.trim() === "" && (
          <p className="text-red-400 text-sm mb-2">O nome é obrigatório.</p>
        )}

        <label className="block mb-2 text-sm text-gray-300">Email:</label>
        <Input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="mb-1"
        />
        {email.trim() === "" && (
          <p className="text-red-400 text-sm mb-2">O email é obrigatório.</p>
        )}

        <label className="block mb-2 text-sm text-gray-300">Nova Senha:</label>
        <Input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="mb-1"
          placeholder="Alterar senha"
        />

        <label className="block mb-2 text-sm text-gray-300">
          Confirmar Senha:
        </label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          className="mb-1"
          placeholder="Confirme a senha"
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-red-400 text-sm mb-2">As senhas não coincidem.</p>
        )}

        <label className="block mb-2 text-sm text-gray-300">ID:</label>
        <Input value={user?.id.toString()} disabled className="mb-6" />

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <Button onClick={handleSave} className="w-full" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
