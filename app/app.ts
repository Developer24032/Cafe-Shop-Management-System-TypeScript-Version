import express from 'express';
import Logger from './middleware/logger';
import mainRoute from './routes/mainRoute';
import errorHandler from './middleware/errorHandler';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

try{
    connect(`${process.env.MONGO_URI}${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`);
} catch (error) {
    console.error('Database connection error: ', error);
}

app.use(express.json());
app.use(Logger);
// Mounting the main route
app.use('/api', mainRoute);
// Error handling middleware
app.use(errorHandler);

export default app;