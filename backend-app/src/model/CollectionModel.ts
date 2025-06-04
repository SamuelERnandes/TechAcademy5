import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import MovieModel from "./MovieModel";
import UserModel from "./UserModel";

class CollectionModel extends Model {
  id_collection: number | undefined;
  name: string | undefined;
  id_user: number | undefined;

  public readonly smovie?: MovieModel[];

  public getMovies!: () => Promise<MovieModel[]>;
  public addMovie!: (movie: MovieModel | number) => Promise<void>;
  public addMovies!: (movies: MovieModel[] | number[]) => Promise<void>;
}

CollectionModel.init(
  {
    id_collection: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CollectionModel",
    tableName: "collections",
  }
);

export default CollectionModel;
