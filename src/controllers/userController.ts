import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../model/UserModel';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      cpf,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password, cpf } = req.body;
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.cpf = cpf;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error });
  }
};
