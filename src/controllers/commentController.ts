import { Request, Response } from 'express';
import Comment from '../model/CommentModel';

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentários', error });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar comentário', error });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { id_film, id_user, comment } = req.body;

    const newComment = await Comment.create({
      id_film,
      id_user,
      comment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'error creating comment', error });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const [updatedRows] = await Comment.update(
      { comment },
      { where: { id_comment: id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRows = await Comment.destroy({ where: { id_comment: id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment ', error });
  }
};
