import { Request, Response } from "express";
import User from "../../models/user";
import mongoose from "mongoose";

export async function updateUserController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    //update the user
    user.name = req.body.name;
    user.bio = req.body.bio;
    user.email = req.body.email;
    user.password = req.body.password;
    user.likedFoods = req.body.likedFoods;
    await user.save();
    res.status(200).send(`User ${req.params.userId} has been updated.`);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
