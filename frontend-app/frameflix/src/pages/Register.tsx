import { useForm, FormProvider } from "react-hook-form";

import { RegisterForm } from "@/types/auth";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import TextInput from "@/components/ui/textinput";

import Logo from "@/components/ui/logo";

import api from "@/services/api";

import { isValidCPF } from "@/utils/cpfValidator";

const Register = () => {
  const form = useForm<RegisterForm>();

  const navigate = useNavigate();

  const onSubmit = async (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      toast.error("As senhas não coincidem");

      return;
    }

    try {
      await api.post("/users", {
        name: values.name,

        email: values.email,

        password: values.password,

        cpf: values.cpf,
      });

      toast.success("Cadastro realizado com sucesso!");

      navigate("/login");
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        <h1 className="text-4xl font-bold mb-2 text-center">Criar conta</h1>

        <p className="text-sm text-gray-400 mb-8 text-center">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">
            Entrar
          </Link>
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <TextInput
              name="name"
              label="Nome"
              rules={{ required: "Nome obrigatório" }}
            />

            <TextInput
              name="email"
              label="E-mail"
              type="email"
              rules={{ required: "E-mail obrigatório" }}
            />

            <TextInput
              name="password"
              label="Senha"
              type="password"
              rules={{ required: "Senha obrigatória" }}
            />

            <TextInput
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              rules={{ required: "Confirmação obrigatória" }}
            />

            <TextInput
              name="cpf"
              label="CPF"
              type="text"
              rules={{
                required: "CPF obrigatório",
                validate: (value: string) =>
                  isValidCPF(value) || "CPF inválido",
              }}
            />

            <Button type="submit" className="bg-teal-500">
              Cadastrar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Register;
