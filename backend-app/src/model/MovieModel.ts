import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import AuthorModel from './AuthorModel';

import Comment from './CommentModel';
import Rating from './RatingModel';

class MovieModel extends Model {
  id_movie: number | undefined;
  title: string | undefined;
  description: Text | undefined;
  year: number | undefined;
  gender: String | undefined;
  authorId: number | undefined;
}

MovieModel.init(
  {
    id_movie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'MovieModel',
    tableName: 'movies',
  }
);

MovieModel.belongsTo(AuthorModel, {
  foreignKey: 'authorId',
  as: 'author',
});
AuthorModel.hasMany(MovieModel, {
  foreignKey: 'authorId',
  as: 'movies',
});

MovieModel.hasMany(Rating, {
  foreignKey: 'id_movie',
  as: 'ratings',
});

Rating.belongsTo(MovieModel, {
  foreignKey: 'id_movie',
});

MovieModel.hasMany(Comment, {
  foreignKey: 'id_movie',
  as: 'comments',
});

Comment.belongsTo(MovieModel, {
  foreignKey: 'id_movie',
});
export default MovieModel;
