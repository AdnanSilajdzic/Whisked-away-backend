import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcrypt";

export async function createUserController(req: Request, res: Response) {
  const email = req.body.email;
  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(400).json({ message: "Email already in use." });
    return;
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    creationDate: Date.now(),
    bio: req.body.bio,
  });

  const createdUser = await newUser.save();
  res.json(createdUser);
}
