import { Request, Response } from "express";
import Deck from "../models/recipe";

export async function createRecipeController(req: Request, res: Response) {
  const newDeck = new Deck({
    name: req.body.name,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
  });
  const createdRecipe = await newDeck.save();
  res.json(createdRecipe);
}
