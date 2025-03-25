import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModels";

class FilmModel extends Model {
  id_film: number | undefined;
  title: string | undefined;
  description: Text | undefined;
  year: number | undefined;
  gender: string | undefined;
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
    modelName: "FilmModel",
    tableName: "films",
  }
);

FilmModel.belongsTo(AuthorModel, {
  foreignKey: "authorId",
  as: "author",
});
AuthorModel.hasMany(FilmModel, {
  foreignKey: "authorId",
  as: "films",
});
export default FilmModel;
