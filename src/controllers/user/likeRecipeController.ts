import { Request, Response } from "express";
import User from "../../models/user";
import Recipe from "../../models/recipe";
import mongoose from "mongoose";

export async function likeRecipeController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);
    const recipe = await Recipe.findById(req.params.recipeId);
    const recipeId = new mongoose.Types.ObjectId(req.params.recipeId);

    if (!user || !recipe) {
      res.status(404).send("User or recipe not found.");
      return;
    }
    //check if recipe is already liked

    if (user.likedRecipes.includes(recipeId)) {
      //unlike the recipe
      const index = user.likedRecipes.indexOf(recipeId);
      user.likedRecipes.splice(index, 1);
      await user.save();
      recipe.likes--;
      await recipe.save();
      res
        .status(200)
        .send(
          `Recipe ${req.params.recipeId} has been removed from the liked recipes of user ${req.params.userId}.`
        );
      return;
    }

    // Add the recipe to the user's likedRecipes array
    user.likedRecipes.push(recipeId);

    // Save the updated user object
    await user.save();

    // Increment the likes count for the recipe
    recipe.likes++;

    // Save the updated recipe object
    await recipe.save();

    res
      .status(200)
      .send(
        `Recipe ${req.params.recipeId} has been added to the liked recipes of user ${req.params.userId}.`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
