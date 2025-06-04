import MovieModel from "./MovieModel";
import CollectionModel from "./CollectionModel";
import UserModel from "./UserModel";
import AuthorModel from "./AuthorModel";
import RatingModel from "./RatingModel";

// Autor — Filme
MovieModel.belongsTo(AuthorModel, { foreignKey: "authorId", as: "author" });
AuthorModel.hasMany(MovieModel, {
  foreignKey: "authorId",
  as: "authoredMovies",
});

// Filme — Avaliações
MovieModel.hasMany(RatingModel, { foreignKey: "id_movie", as: "ratings" });
RatingModel.belongsTo(MovieModel, { foreignKey: "id_movie", as: "movie" });

// Filme — Coleção (N:N)
CollectionModel.belongsToMany(MovieModel, {
  through: "collection_movies",
  foreignKey: "id_collection",
  otherKey: "id_movie",
  as: "movies",
});
MovieModel.belongsToMany(CollectionModel, {
  through: "collection_movies",
  foreignKey: "id_movie",
  otherKey: "id_collection",
  as: "collections",
});

// Usuário — Coleção
CollectionModel.belongsTo(UserModel, {
  foreignKey: "id_user",
  as: "user",
});
UserModel.hasMany(CollectionModel, {
  foreignKey: "id_user",
  as: "collections",
});
