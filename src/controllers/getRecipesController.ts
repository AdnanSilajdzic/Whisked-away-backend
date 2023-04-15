import { Request, Response } from "express";
import Recipe from "../models/recipe";

export async function getRecipesController(req: Request, res: Response) {
  const recipes = await Recipe.find();
  console.log(recipes);
  res.json(recipes);
}
