import { Request, Response } from 'express';
import Rating from '../model/RatingModel';

export const getAllRatings = async (req: Request, res: Response) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error });
  }
};

export const getRatingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);

    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rating', error });
  }
};

export const createRating = async (req: Request, res: Response) => {
  try {
    const { id_movie, id_user, rating, comment } = req.body;

    const newRating = await Rating.create({
      id_movie,
      id_user,
      rating,
      comment,
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error });
  }
};

export const updateRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const [updatedRows] = await Rating.update(
      { rating },
      { where: { id_rating: id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rating', error });
  }
};

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRows = await Rating.destroy({ where: { id_rating: id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rating', error });
  }
};
