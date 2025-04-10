import { Request, Response } from 'express';
import CollectionModel from '../model/CollectionModel';
import MovieModel from '../model/MovieModel';

export const getAll = async (req: Request, res: Response) => {
  const { id: id_user } = req.params;

  const collections = await CollectionModel.findAll({
    where: { id_user },
    include: [
      {
        model: MovieModel,
        as: 'movies',
        through: { attributes: [] },
        attributes: ['id_movie', 'title'],
      },
    ],
  });

  res.send(collections);
};

export const getCollectionById = async (req: Request, res: Response) => {
  const { id: id_user, collectionId: id_collection } = req.params;

  const collection = await CollectionModel.findOne({
    where: { id_collection, id_user },
    include: [{ model: MovieModel, as: 'movies' }],
  });

  if (!collection) {
    return res.status(404).json({ error: 'Collection not found' });
  }

  res.json(collection);
};

export const createCollection = async (req: Request, res: Response) => {
  const { id: id_user } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newCollection = await CollectionModel.create({
    name,
    id_user,
  });

  res.status(201).json(newCollection);
};

export const updateCollection = async (req: Request, res: Response) => {
  const { id: id_user, collectionId: id_collection } = req.params;
  const { name } = req.body;

  const collection = await CollectionModel.findOne({
    where: { id_collection, id_user },
  });

  if (!collection) {
    return res.status(404).json({ error: 'Collection not found' });
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
    return res.status(404).json({ error: 'Collection not found' });
  }

  await collection.destroy();

  res.status(204).send();
};
