import { Request, Response } from "express";
import User from "../../models/user";

export async function getUsersController(req: Request, res: Response) {
  const users = await User.find();
  res.json(users);
}
