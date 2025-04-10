import AuthorModel from "../model/AuthorModel";
import MovieModel from "../model/MovieModel";

import { Request, Response } from "express";
import Rating from "../model/RatingModel";
import Comment from "../model/RatingModel";

export const getAll = async (req: Request, res: Response) => {
  const movies = await MovieModel.findAll();
  res.send(movies);
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id, {
      include: [
        {
          model: AuthorModel,
          as: "author",
          attributes: ["id_author", "name"],
        },
        {
          model: Rating,
          as: "ratings",
          attributes: ["rating"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["comment"],
        },
      ],
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, year, gender, authorId } = req.body;

    if (!title || !description || !year || !gender) {
      return res.status(400).json({
        error: "All fields (title, description, year, gender) are required",
      });
    }

    const newMovie = await MovieModel.create({
      title,
      description,
      year,
      gender,
      authorId,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, year, gender, authorId } = req.body;
    const movie = await MovieModel.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.year = year || movie.year;
    movie.gender = gender || movie.gender;
    movie.authorId = authorId || movie.authorId;

    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await MovieModel.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    await movie.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
