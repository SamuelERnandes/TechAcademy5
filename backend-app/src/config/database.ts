import { Sequelize } from "sequelize";

const sequelize = new Sequelize("streaming", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

export default sequelize;
