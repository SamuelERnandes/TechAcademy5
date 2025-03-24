import { Request, Response } from "express";
import CollectionModel from "../models/CollectionModel";
import FilmModel from "../models/FilmModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await CollectionModel.findAll({
    include: [
      {
        model: FilmModel,
        as: "films",
        through: { attributes: [] },
        attributes: ["id_film", "title"],
      },
    ],
  });
  res.send(users);
};
