import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('streaming_frame', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .sync()
  .then(() => {
    console.log('database foi sincronizado com sucesso');
  })
  .catch((error) => {
    console.log('deu zica no bagulho', error);
  });

export default sequelize;
