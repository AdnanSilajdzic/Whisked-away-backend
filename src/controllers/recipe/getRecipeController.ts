import { Request, Response } from "express";
import Recipe from "../../models/recipe";

export async function getRecipeController(req: Request, res: Response) {
  const recipeId = req.params.recipeId;
  const recipe = await Recipe.findById(recipeId);
  res.json(recipe);
}
