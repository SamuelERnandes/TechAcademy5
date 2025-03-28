import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AuthorModel extends Model {
  id_author: number | undefined;
  name: string | undefined;
  biography: string | undefined;
}

AuthorModel.init(
  {
    id_author: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AuthorModel',
    tableName: 'Authors',
  }
);

export default AuthorModel;
