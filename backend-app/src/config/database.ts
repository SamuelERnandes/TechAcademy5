import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('database foi sincronizado com sucesso');
  })
  .catch((error) => {
    console.log('deu zica no bagulho', error);
  });

export default sequelize;
