import jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_bem_secreto';
const JWT_EXPIRES_IN = '7d';

export const generateToken = (user: UserModel): string => {
  const { id_user, name, email } = user; // Extraímos os campos importantes
  return jwt.sign({ id_user, name, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
