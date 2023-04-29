import { Request, Response } from "express";
import User from "../../models/user";

export async function createUserController(req: Request, res: Response) {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    creationDate: Date.now(),
    bio: req.body.bio,
    likedFoods: req.body.likedFoods,
  });
  const createdUser = await newUser.save();
  res.json(createdUser);
}
