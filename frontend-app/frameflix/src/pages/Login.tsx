import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import AuthContext from "@/context/AuthContext";
import TextInput from "@/components/ui/textinput";
import Logo from "@/components/ui/logo";
import api from "@/services/api";

type ILoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const form = useForm<ILoginForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onSubmit = useCallback(
    async (values: ILoginForm) => {
      try {
        setLoading(true);

        const { data } = await api.post("/login", {
          email: values.email,
          password: values.password,
        });

        authContext.login(data.token);
        navigate("/movies");

        toast.success("Login realizado com sucesso!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.error || "Erro ao fazer login.");
        } else {
          toast.error("Função indisponível, tente novamente mais tarde.");
        }
      } finally {
        setLoading(false);
      }
    },
    [authContext, navigate]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          type="email"
          label="E-mail"
          name="email"
          rules={{ required: true }}
        />
        <TextInput
          type="password"
          label="Senha"
          name="password"
          rules={{ required: true }}
        />
        <Button type="submit" className="w-full bg-teal-500" disabled={loading}>
          Entrar
        </Button>
      </form>
    </FormProvider>
  );
};

const Login = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-center">Entrar</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Informe o e-mail e senha cadastrados.
          <br />
          Novo por aqui?{" "}
          <Link
            to="/register"
            className="text-teal-400 font-medium hover:underline"
          >
            Cadastre-se!
          </Link>
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
