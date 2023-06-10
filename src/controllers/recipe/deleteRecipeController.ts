import { Request, Response } from 'express';
import Deck from '../../models/recipe';
import mongoose from 'mongoose';
import User from '../../models/user';

export async function deleteRecipeController(req: Request, res: Response) {
	const recipeId = req.params.recipeId;
	//delete image from images/recipe folder
	const recipe = await Deck.findById(recipeId);
	if (recipe?.image) {
		const fs = require('fs');
		fs.unlink(`src/images/recipe/${recipe.image}`, (err: any) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}
	//delete recipe from user's recipes, savedRecipes, and likedRecipes
	const users = await User.find();
	users.forEach(async (user: any) => {
		if (user.recipes.includes(recipeId)) {
			user.recipes.pull(recipeId);
			await user.save();
		}
	});
	users.forEach(async (user: any) => {
		if (user.savedRecipes.includes(recipeId)) {
			user.savedRecipes.pull(recipeId);
			await user.save();
		}
	});
	users.forEach(async (user: any) => {
		if (user.likedRecipes.includes(recipeId)) {
			user.likedRecipes.pull(recipeId);
			await user.save();
		}
	});
	//delete recipe
	await Deck.findByIdAndDelete(recipeId);

	res.json(recipe);
}
