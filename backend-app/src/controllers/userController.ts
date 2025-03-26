import { Request, Response } from 'express';
import UserModel from '../models/UserModels';
import bcrypt from 'bcrypt';

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: 'Values required' });
    }

    const user = await UserModel.create({ name, email, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json('Erro interno no servidor ' + error);
  }
};

export const updateUser = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name || name === ' ') {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    user.name = name;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json('Internal server error' + error);
  }
};

export const deleteUserById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json('Internal server error' + error);
  }
};
