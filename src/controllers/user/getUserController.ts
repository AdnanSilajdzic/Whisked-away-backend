import { Request, Response } from "express";
import User from "../../models/user";

export async function getUserController(req: Request, res: Response) {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.json(user);
}
