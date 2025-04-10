import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import { passwordValidation } from "../shemas/passwordValidation";
import { cpfValidation } from "../shemas/cpfValidation";
import Joi from "joi";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailSchema = Joi.string().email().required();
    const { error: emailError } = emailSchema.validate(email);
    if (emailError) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const { error: cpfError } = cpfValidation.validate(cpf);
    if (cpfError) {
      return res.status(400).json({ error: cpfError.details[0].message });
    }

    const { error: passwordError } = passwordValidation.validate(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError.details[0].message });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      cpf,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verifica se tem algo para atualizar
    if (!name && !email && !password) {
      return res
        .status(400)
        .json({ error: "Nenhum dado enviado para atualização." });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const { error: passwordError } = passwordValidation.validate(password);
      if (passwordError) {
        return res
          .status(400)
          .json({ error: passwordError.details[0].message });
      }
      user.password = password;
    }

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error });
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error });
  }
};
