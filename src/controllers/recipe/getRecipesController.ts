import { Request, Response } from 'express';
import Recipe from '../../models/recipe';
import multer from 'multer';
import path from 'path';
export async function getRecipesController(req: Request, res: Response) {
	const recipes = await Recipe.find();

	res.json(recipes);
}
