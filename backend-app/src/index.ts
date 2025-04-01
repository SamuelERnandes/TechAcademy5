import express, { Router } from 'express';
import userRoutes from './routes/userRoutes';
import filmRoutes from './routes/filmRoutes';
import collectionRoutes from './routes/collectionRoutes';
import loginRoutes from './routes/loginRoutes';
import commentRoutes from './routes/commentRoutes';
import ratingRoutes from './routes/ratingRoutes';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World! :)');
});
app.use(express.json());
app.use(userRoutes);
app.use(filmRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);
app.use(commentRoutes);
app.use(ratingRoutes);

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
