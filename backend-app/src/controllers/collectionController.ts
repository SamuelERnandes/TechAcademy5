import { Request, Response } from "express";
import CollectionModel from "../model/CollectionModel";
import MovieModel from "../model/MovieModel";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    // outros dados se quiser, como email
  };
}

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id; // ou req.userId dependendo do seu middleware

  try {
    const collections = await CollectionModel.findAll({
      where: { id_user: userId },
      include: [
        {
          model: MovieModel,
          as: "movies",
          through: { attributes: [] },
          attributes: ["id_movie", "title"],
        },
      ],
    });

    res.send(collections);
  } catch (error) {
    console.error("Erro ao buscar coleções:", error);
    res.status(500).json({ error: "Erro ao buscar coleções" });
  }
};

export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const collection = await CollectionModel.findByPk(req.params.id, {
      include: [
        {
          model: MovieModel,
          as: "movies",
        },
      ],
    });
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newCollection = await CollectionModel.create({
      name,
    });

    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const collection = await CollectionModel.findByPk(id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    collection.name = name || collection.name;
    await collection.save();

    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const collection = await CollectionModel.findByPk(id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    await collection.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
