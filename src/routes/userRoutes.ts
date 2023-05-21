import express from 'express';

import { createUserController } from '../controllers/user/createUserController';
import { getUserController } from '../controllers/user/getUserController';
import { getUsersController } from '../controllers/user/getUsersController';
import { deleteUserController } from '../controllers/user/deleteUserController';
import { likeRecipeController } from '../controllers/user/likeRecipeController';
import { saveRecipeController } from '../controllers/user/saveRecipeController';
import { getLikedRecipesController } from '../controllers/user/getLikedRecipesController';
import { getSavedRecipesController } from '../controllers/user/getSavedRecipes';
import { followUserController } from '../controllers/user/followUserController';
import { loginUserController } from '../controllers/user/loginUserController';
import { getFollowersController } from '../controllers/user/getFollowersController';
import { getFollowingController } from '../controllers/user/getFollowingController';
import { getUserRecipesController } from '../controllers/user/getUserRecipesController';
import { updateUserController } from '../controllers/user/updateUserController';
import { authMiddleware } from '../middleware/authenticateToken';
import sendMailController from '../controllers/user/sendMailController';
import uploadImage from '../middleware/uploadImage';
const router = express.Router();

router.post('/user', uploadImage, createUserController);
router.get('/user/:userId', getUserController);
router.get('/user', getUsersController);
router.delete('/user/:userId', authMiddleware, deleteUserController);
router.post('/user/:userId/likedRecipes/:recipeId', authMiddleware, likeRecipeController);
router.get('/user/:userId/likedRecipes/', authMiddleware, getLikedRecipesController);
router.post('/user/:userId/savedRecipes/:recipeId', authMiddleware, saveRecipeController);
router.get('/user/:userId/savedRecipes', authMiddleware, getSavedRecipesController);
router.post('/user/:userId/follow/:followingId', authMiddleware, followUserController);
router.get('/user/:userId/followers', getFollowersController);
router.get('/user/:userId/following', getFollowingController);
router.post('/user/login', loginUserController);
router.get('/user/:userId/recipes', getUserRecipesController);
router.patch('/user/:userId', authMiddleware, updateUserController);
router.post('/sendMail', sendMailController);

export default router;
