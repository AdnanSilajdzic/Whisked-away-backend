import { Request, Response } from "express";
import Deck from "../models/recipe";

export async function deleteRecipeController(req: Request, res: Response) {
  const recipeId = req.params.recipeId;
  const recipe = await Deck.findByIdAndDelete(recipeId);
  res.json(recipe);
}
