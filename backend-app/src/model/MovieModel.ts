import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class MovieModel extends Model {
  id_movie: number | undefined;
  title: string | undefined;
  description: Text | undefined;
  year: number | undefined;
  gender: String | undefined;
  authorId: number | undefined;
  videoFile: string | undefined;
  poster: string | undefined;
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
    videoFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'MovieModel',
    tableName: 'movies',
  }
);

export default MovieModel;
