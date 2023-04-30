import { Request, Response } from "express";
import User from "../../models/user";
import Recipe from "../../models/recipe";
import mongoose from "mongoose";

export async function getUserRecipesController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    //find all recipes that are created by the user
    const recipes = await Recipe.find({
      _id: { $in: user.recipes },
    });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
