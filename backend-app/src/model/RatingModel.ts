import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Rating extends Model {
  id_rating: number | undefined;
  id_movie: number | undefined;
  id_user: number | undefined;
  rating: number | undefined;
  comment: string | undefined;
}

Rating.init(
  {
    id_rating: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_movie: {
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
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Rating",
    tableName: "ratings",
  }
);

export default Rating;
