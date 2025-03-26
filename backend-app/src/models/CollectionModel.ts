import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import FilmModel from './FilmModel';

class CollectionModel extends Model {
  id_collection: number | undefined;
  name: string | undefined;

  public readonly films?: FilmModel[];

  public getFilms!: () => Promise<FilmModel[]>;
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
  },
  {
    sequelize,
    modelName: 'CollectionModel',
    tableName: 'collections',
  }
);

CollectionModel.belongsToMany(FilmModel, {
  through: 'collection_films',
  foreignKey: 'id_collection',
  as: 'films',
});
FilmModel.belongsToMany(CollectionModel, {
  through: 'collection_films',
  foreignKey: 'id_film',
  as: 'collection',
});
export default CollectionModel;
