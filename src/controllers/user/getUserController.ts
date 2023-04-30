import { Request, Response } from "express";
import User from "../../models/user";

export async function getUserController(req: Request, res: Response) {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
}
