import express, { Request, Response } from "express";
import { config } from "dotenv";
//mongoose is used to connect to the database
import mongoose from "mongoose";
import Deck from "./models/recipe";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes";
config();
//we have created an app that can listen to requests
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

//this is the code for connecting with the database
const db = mongoose
  .connect(process.env.MONGO_URL!)
  //using .then we can assure that the previous process was fully finished before starting this
  .then(() => {
    console.log(`Listening on port ${PORT}`);
  });

app.use("/api", recipeRoutes);
app.listen(PORT);
