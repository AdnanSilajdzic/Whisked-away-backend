import { Request, Response } from 'express';
import User from '../../models/user';
import Recipe from '../../models/recipe';

export async function deleteUserController(req: Request, res: Response) {
	const userId = req.params.userId;
	const user = await User.findByIdAndDelete(userId);

	if (!user) {
		res.status(404).json({ error: 'User not found' });
		return;
	}

	const recipes = await Recipe.find();
	recipes.forEach(async (recipe: any) => {
		if (user.likedRecipes.includes(recipe._id)) {
			recipe.likes--;
			await recipe.save();
		}
	});

	recipes.forEach(async (recipe: any) => {
		if (user.savedRecipes.includes(recipe._id)) {
			recipe.saves--;
			await recipe.save();
		}
	});

	recipes.forEach(async (recipe: any) => {
		if (user.recipes.includes(recipe._id)) {
			await Recipe.findByIdAndDelete(recipe._id);
		}
	});

	res.json(user);
}
