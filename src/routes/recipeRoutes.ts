import express from "express";

import { getRecipesController } from "../controllers/getRecipesController";
import { createRecipeController } from "../controllers/createRecipeController";
import { deleteRecipeController } from "../controllers/deleteRecipeController";
import { getRecipeController } from "../controllers/getRecipeController";

const router = express.Router();

router.get("/recipe", getRecipesController);
router.delete("/recipe/:recipeId", deleteRecipeController);
router.post("/recipe", createRecipeController);
router.get("/recipe/:recipeId", getRecipeController);
export default router;
