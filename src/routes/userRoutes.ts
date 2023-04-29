import express from "express";

import { createUserController } from "../controllers/user/createUserController";
import { getUserController } from "../controllers/user/getUserController";
import { getUsersController } from "../controllers/user/getUsersController";
import { deleteUserController } from "../controllers/user/deleteUserController";

const router = express.Router();

router.post("/user", createUserController);
router.get("/user/:userId", getUserController);
router.get("/user", getUsersController);
router.delete("/user/:userId", deleteUserController);
export default router;
