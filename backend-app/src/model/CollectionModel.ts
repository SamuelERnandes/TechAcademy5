import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import MovieModel from './MovieModel';
import UserModel from './UserModel';

class CollectionModel extends Model {
  id_collection: number | undefined;
  name: string | undefined;
  id_user: number | undefined;

  public readonly smovie?: MovieModel[];

  public getMovie!: () => Promise<MovieModel[]>;
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
    modelName: 'CollectionModel',
    tableName: 'collections',
  }
);

CollectionModel.belongsToMany(MovieModel, {
  through: 'collection_movies',
  foreignKey: 'id_collection',
  as: 'movies',
});
MovieModel.belongsToMany(CollectionModel, {
  through: 'collection_movies',
  foreignKey: 'id_movie',
  as: 'collection',
});
CollectionModel.belongsTo(UserModel, {
  foreignKey: 'id_user',
  as: 'users',
});
UserModel.hasMany(CollectionModel, {
  foreignKey: 'id_user',
  as: 'collections',
});

export default CollectionModel;
