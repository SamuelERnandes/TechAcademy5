import { Request, Response } from "express";
import CollectionModel from "../model/CollectionModel";
import MovieModel from "../model/MovieModel";

export const getAll = async (req: Request, res: Response) => {
  const { id: id_user } = req.params;

  const collections = await CollectionModel.findAll({
    where: { id_user },
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
};

export const getCollectionById = async (req: Request, res: Response) => {
  const { id: id_user, collectionId: id_collection } = req.params;

  const collection = await CollectionModel.findOne({
    where: { id_collection, id_user },
    include: [{ model: MovieModel, as: "movies" }],
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  res.json(collection);
};

export const createCollection = async (req: Request, res: Response) => {
  const { id: id_user } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newCollection = await CollectionModel.create({
    name,
    id_user,
  });

  res.status(201).json(newCollection);
};

export const addMovieToCollection = async (req: Request, res: Response) => {
  const { collectionId } = req.params;
  const { movieId } = req.body;
  const id_user = req.user?.id_user;

  console.log(req.body);
  console.log("Adding movie to collection:", movieId);
  try {
    const collection = await CollectionModel.findOne({
      where: {
        id_collection: collectionId,
        id_user,
      },
      include: [{ model: MovieModel, as: "movies" }],
    });

    if (!collection) {
      console.error("Collection not found");
      return res.status(404).json({ error: "Collection not found" });
    }

    const movie = await MovieModel.findByPk(movieId);
    if (!movie) {
      console.log("Movie not found");
      return res.status(404).json({ error: "Movie not found" });
    }

    await collection.addMovie(movieId);
    res.status(200).json({ message: "Filme adicionado à coleção" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar filme à coleção" });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  const { id: id_user, collectionId: id_collection } = req.params;
  const { name } = req.body;

  const collection = await CollectionModel.findOne({
    where: { id_collection, id_user },
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  collection.name = name || collection.name;
  await collection.save();

  res.json(collection);
};

export const deleteCollection = async (req: Request, res: Response) => {
  const { id: id_user, collectionId: id_collection } = req.params;

  const collection = await CollectionModel.findOne({
    where: { id_collection, id_user },
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  await collection.destroy();

  res.status(204).send();
};
