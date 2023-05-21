import { Request, Response } from 'express';
import Deck from '../../models/recipe';
import mongoose from 'mongoose';

export async function deleteRecipeController(req: Request, res: Response) {
	const recipeId = req.params.recipeId;
	const recipe = await Deck.findByIdAndDelete(recipeId);
	//delete recipe from user's recipes array
	const userId = recipe?.author;
	await mongoose.model('User').findByIdAndUpdate(userId, { $pull: { recipes: recipeId } }, { new: true });

	res.json(recipe);
}
