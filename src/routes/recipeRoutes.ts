import express from "express";

import { getRecipesController } from "../controllers/recipe/getRecipesController";
import { createRecipeController } from "../controllers/recipe/createRecipeController";
import { deleteRecipeController } from "../controllers/recipe/deleteRecipeController";
import { getRecipeController } from "../controllers/recipe/getRecipeController";

const router = express.Router();

router.get("/recipe", getRecipesController);
router.delete("/recipe/:recipeId", deleteRecipeController);
router.post("/recipe", createRecipeController);
router.get("/recipe/:recipeId", getRecipeController);
export default router;
