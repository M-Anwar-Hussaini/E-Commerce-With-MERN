import express from 'express';
import dotenv from 'dotenv';
import process from 'process';
import productRoutes from './routes/productRoutes.js';
import connectToDatabase from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';

// Intial configurations
dotenv.config({ path: './config/config.env' });
const app = express();

app.use(express.json());

// Defining the routes:
app.use('/api/v1', productRoutes);

// Middleware to handle errors
app.use(errorMiddleware);

// Running the application
app.listen(process.env.PORT, () => {
  connectToDatabase();
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

export default app;
