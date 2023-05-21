import { Request, Response } from 'express';
import Deck from '../../models/recipe';

export async function createRecipeController(req: Request, res: Response) {
	const newDeck = new Deck({
		name: req.body.name,
		instructions: req.body.instructions,
		ingredients: req.body.ingredients,
		tags: req.body.tags,
		serves: req.body.serves,
		cookTime: req.body.cookTime,
		image: req.file?.filename,
	});
	const createdRecipe = await newDeck.save();
	res.json(createdRecipe);
}
