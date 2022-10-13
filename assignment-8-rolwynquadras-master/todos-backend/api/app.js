import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import models from './models/index.js';
import cors from 'cors';

// creates an express server
const app = express();

// connect to the database
mongoose.connect('mongodb://localhost:27017/todosdb');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// pass express app as input and set routes
routes(app)

export default app;