import { Request, Response } from "express";
import User from "../../models/user";
import mongoose from "mongoose";

export async function getFollowingController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    //find all users that the user is following
    const following = await User.find({
      _id: { $in: user.following },
    });
    res.json(following);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
