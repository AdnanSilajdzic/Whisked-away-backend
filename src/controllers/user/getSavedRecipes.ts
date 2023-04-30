import { Request, Response } from "express";
import User from "../../models/user";
import Recipe from "../../models/recipe";
import mongoose from "mongoose";

export async function getSavedRecipesController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send("User or recipe not found.");
      return;
    }
    //find all recipes that are liked by the user
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.json(savedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
