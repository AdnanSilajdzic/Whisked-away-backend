import { Request, Response } from 'express';
import Deck from '../../models/recipe';
import mongoose from 'mongoose';

export async function createRecipeController(req: Request, res: Response) {
	const newDeck = new Deck({
		name: req.body.name,
		author: req.body.author,
		instructions: req.body.instructions,
		ingredients: req.body.ingredients,
		tags: req.body.tags,
		serves: req.body.serves,
		cookTime: req.body.cookTime,
		image: req.file?.filename,
	});
	const createdRecipe = await newDeck.save();

	//add recipe id to user's recipes array
	const userId = req.body.author;

	await mongoose.model('User').findByIdAndUpdate(userId, { $push: { recipes: createdRecipe._id } }, { new: true });

	res.json(createdRecipe);
}
