import express from "express";

import { createUserController } from "../controllers/user/createUserController";
import { getUserController } from "../controllers/user/getUserController";
import { getUsersController } from "../controllers/user/getUsersController";
import { deleteUserController } from "../controllers/user/deleteUserController";
import { likeRecipeController } from "../controllers/user/likeRecipeController";
import { saveRecipeController } from "../controllers/user/saveRecipeController";
import { getLikedRecipesController } from "../controllers/user/getLikedRecipesController";
import { getSavedRecipesController } from "../controllers/user/getSavedRecipes";
import { followUserController } from "../controllers/user/followUserController";
import { loginUserController } from "../controllers/user/loginUserController";
import { getFollowersController } from "../controllers/user/getFollowersController";
import { getFollowingController } from "../controllers/user/getFollowingController";
import { getUserRecipesController } from "../controllers/user/getUserRecipesController";

const router = express.Router();

router.post("/user", createUserController);
router.get("/user/:userId", getUserController);
router.get("/user", getUsersController);
router.delete("/user/:userId", deleteUserController);
router.post("/user/:userId/likedRecipes/:recipeId", likeRecipeController);
router.get("/user/:userId/likedRecipes/", getLikedRecipesController);
router.post("/user/:userId/savedRecipes/:recipeId", saveRecipeController);
router.get("/user/:userId/savedRecipes", getSavedRecipesController);
router.post("/user/:userId/follow/:followingId", followUserController);
router.get("/user/:userId/followers", getFollowersController);
router.get("/user/:userId/following", getFollowingController);
router.post("/user/login", loginUserController);
router.get("/user/:userId/recipes", getUserRecipesController);

export default router;
