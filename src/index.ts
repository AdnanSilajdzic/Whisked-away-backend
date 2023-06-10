import express, { Request, Response } from 'express';
import { config } from 'dotenv';
//mongoose is used to connect to the database
import mongoose from 'mongoose';
import Deck from './models/recipe';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';
config();
//we have created an app that can listen to requests
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;
const imageDir = path.join(__dirname, 'images', 'recipe');
const profileDir = path.join(__dirname, 'images', 'profile');

app.use('/images/recipe', express.static(imageDir));
app.use('/images/profile', express.static(profileDir));

//this is the code for connecting with the database
const db = mongoose
	.connect(process.env.MONGO_URL!)
	//using .then we can assure that the previous process was fully finished before starting this
	.then(() => {
		console.log(`Listening on port ${PORT}`);
	});

app.use('/api', recipeRoutes);
app.use('/api', userRoutes);
app.listen(PORT);
