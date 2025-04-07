import express from 'express';
import path from 'path';
import corsMiddleware from './middleware/corsMiddleware'; // ⬅️ import do middleware

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import collectionRoutes from './routes/collectionRoutes';
import loginRoutes from './routes/loginRoutes';
import commentRoutes from './routes/commentRoutes';
import ratingRoutes from './routes/ratingRoutes';

const app = express();
const port = 3000;

app.use(corsMiddleware);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! :)');
});

app.use(userRoutes);
app.use(movieRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);
app.use(commentRoutes);
app.use(ratingRoutes);

app.use('/videos', express.static(path.join(__dirname, 'public', 'videos')));

app.listen(port, () => {
  console.log('Server is running on port', port);
});
