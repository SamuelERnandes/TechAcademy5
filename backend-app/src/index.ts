import express from "express";
import path from "path";
import corsMiddleware from "./middleware/corsMiddleware";

import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import loginRoutes from "./routes/loginRoutes";
import ratingRoutes from "./routes/ratingRoutes";
import "./model/associations";

const app = express();
const port = 3000;

app.use(corsMiddleware);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(userRoutes);
app.use(movieRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);
app.use(ratingRoutes);

app.use(
  "/assets/public",
  express.static(path.join(__dirname, "../assets/public"))
);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
