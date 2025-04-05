// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type LoginFormData = {
  email: string;
  password: string;
};

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const mockToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm8iLCJjcGYiOiIxMjMuNDU2Ljc4OS0wMCJ9.ABC123...";
      login(mockToken);
      navigate("/movies");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <h1 className="text-2xl font-bold">Login</h1>

        <Input
          {...register("email", { required: "E-mail obrigatório" })}
          placeholder="E-mail"
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          {...register("password", { required: "Senha obrigatória" })}
          placeholder="Senha"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  );
}
