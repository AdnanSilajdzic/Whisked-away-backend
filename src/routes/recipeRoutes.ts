import express from 'express';

import { getRecipesController } from '../controllers/recipe/getRecipesController';
import { createRecipeController } from '../controllers/recipe/createRecipeController';
import { deleteRecipeController } from '../controllers/recipe/deleteRecipeController';
import { getRecipeController } from '../controllers/recipe/getRecipeController';
import uploadRecipeImage from '../middleware/uploadRecipeImage';
const router = express.Router();

router.get('/recipe', getRecipesController);
router.delete('/recipe/:recipeId', deleteRecipeController);
router.post('/recipe', uploadRecipeImage, createRecipeController);
router.get('/recipe/:recipeId', getRecipeController);
export default router;
