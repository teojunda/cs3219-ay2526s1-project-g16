import express from 'express';
import userRoutes from './routes/user-routes.ts';

const app = express();
const port = 3000;

// Tell the application to use the homeRoutes for all requests to the root path
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});