import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Rating extends Model {
  id_assessment: number | undefined;
  id_film: number | undefined;
  id_user: number | undefined;
  rating: number | undefined;
}

Rating.init(
  {
    id_rating: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_film: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'Ratings',
  }
);

export default Rating;
