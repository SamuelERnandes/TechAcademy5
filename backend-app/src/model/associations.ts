import MovieModel from "./MovieModel";
import Rating from "./RatingModel";
import AuthorModel from "./AuthorModel";

// Movie <-> Author
MovieModel.belongsTo(AuthorModel, { foreignKey: "authorId", as: "author" });
AuthorModel.hasMany(MovieModel, { foreignKey: "authorId", as: "movies" });

// Movie <-> Rating
MovieModel.hasMany(Rating, { foreignKey: "id_movie", as: "ratings" });
Rating.belongsTo(MovieModel, { foreignKey: "id_movie", as: "movie" });
