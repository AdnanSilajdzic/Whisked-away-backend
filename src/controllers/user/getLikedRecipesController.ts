import { Request, Response } from "express";
import User from "../../models/user";
import Recipe from "../../models/recipe";
import mongoose from "mongoose";

export async function getLikedRecipesController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send("User or recipe not found.");
      return;
    }
    //find all recipes that are liked by the user
    const likedRecipes = await Recipe.find({
      _id: { $in: user.likedRecipes },
    });
    res.json(likedRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
