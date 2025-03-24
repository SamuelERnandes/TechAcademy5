import FilmModel from "../models/FilmModel";

import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  const users = await FilmModel.findAll();
  res.send(users);
};
