import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class UserModel extends Model {
  id_user: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  cpf: String | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    if (!this.password) {
      console.error('Erro: Senha não definida no banco.');
      return false;
    }
    return await bcrypt.compare(password, this.password);
  }
}

UserModel.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserModel',
    tableName: 'users',
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});
UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed('password')) {
    await user.hashPassword();
  }
});

export default UserModel;
