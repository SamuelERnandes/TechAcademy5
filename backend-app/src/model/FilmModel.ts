import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import AuthorModel from './AuthorModel';
import Rating from './ratingModel';
import Comment from './CommentModel';

class FilmModel extends Model {
  id_film: number | undefined;
  title: string | undefined;
  description: Text | undefined;
  year: number | undefined;
  gender: String | undefined;
  authorId: number | undefined;
}

FilmModel.init(
  {
    id_film: {
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
    modelName: 'FilmModel',
    tableName: 'films',
  }
);

FilmModel.belongsTo(AuthorModel, {
  foreignKey: 'authorId',
  as: 'author',
});
AuthorModel.hasMany(FilmModel, {
  foreignKey: 'authorId',
  as: 'films',
});

FilmModel.hasMany(Rating, {
  foreignKey: 'id_film',
  as: 'ratings',
});

Rating.belongsTo(FilmModel, {
  foreignKey: 'id_film',
});

FilmModel.hasMany(Comment, {
  foreignKey: 'id_film',
  as: 'comments',
});

Comment.belongsTo(FilmModel, {
  foreignKey: 'id_film',
});
export default FilmModel;
