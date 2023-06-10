import { Request, Response } from 'express';
import User from '../../models/user';
import Recipe from '../../models/recipe';
import mongoose from 'mongoose';

export async function saveRecipeController(req: Request, res: Response) {
	try {
		const user = await User.findById(req.params.userId);
		const recipe = await Recipe.findById(req.params.recipeId);
		const recipeId = new mongoose.Types.ObjectId(req.params.recipeId);

		if (!user || !recipe) {
			res.status(404).send('User or recipe not found.');
			return;
		}
		//check if recipe is already liked

		if (user.savedRecipes.includes(recipeId)) {
			//unlike the recipe
			const index = user.savedRecipes.indexOf(recipeId);
			user.savedRecipes.splice(index, 1);
			await user.save();
			recipe.saves--;
			await recipe.save();
			res.status(200).send({ message: 'Recipe removed from saved recipes successfully' });
			return;
		}

		// Add the recipe to the user's likedRecipes array
		user.savedRecipes.push(recipeId);

		// Save the updated user object
		await user.save();

		// Increment the likes count for the recipe
		recipe.saves++;

		// Save the updated recipe object
		await recipe.save();

		res.status(200).send({ message: 'Recipe saved successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error.');
	}
}
