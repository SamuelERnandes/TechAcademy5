import AuthorModel from "../models/AuthorModels";
import FilmModel from "../models/FilmModel";

import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  const users = await FilmModel.findAll();
  res.send(users);
};

export const getFilmById = async (req: Request, res: Response) => {
  try {
    const film = await FilmModel.findByPk(req.params.id, {
      include: [
        {
          model: AuthorModel,
          as: "author",
        },
      ],
    });

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const createFilm = async (req: Request, res: Response) => {
  try {
    const { title, description, year, gender, authorId } = req.body;

    if (!title || !description || !year || !gender) {
      return res.status(400).json({
        error: "All fields (title, description, year, gender) are required",
      });
    }

    const newFilm = await FilmModel.create({
      title,
      description,
      year,
      gender,
    });

    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const updateFilm = async (req: Request, res: Response) => {
  try {
    const { title, description, year, gender, authorId } = req.body;
    const film = await FilmModel.findByPk(req.params.id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    film.title = title || film.title;
    film.description = description || film.description;
    film.year = year || film.year;
    film.gender = gender || film.gender;
    film.authorId = authorId || film.authorId;

    await film.save();
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const deleteFilm = async (req: Request, res: Response) => {
  try {
    const film = await FilmModel.findByPk(req.params.id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    await film.destroy();
    res.status(204).send(); // Retorna status 204 sem conteúdo
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
