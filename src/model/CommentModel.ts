import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Comment extends Model {
  id_comment: number | undefined;
  id_film: number | undefined;
  id_user: number | undefined;
  comment: string | undefined;
}

Comment.init(
  {
    id_comment: {
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
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
  }
);

export default Comment;
