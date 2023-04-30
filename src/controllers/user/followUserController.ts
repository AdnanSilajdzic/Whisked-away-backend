import { Request, Response } from "express";
import User from "../../models/user";
import mongoose from "mongoose";

export async function followUserController(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);
    const followingUser = await User.findById(req.params.followingId);
    const followingId = new mongoose.Types.ObjectId(req.params.followingId);

    if (!user || !followingUser) {
      res.status(404).send("Follower or user not found.");
      return;
    }
    //check if recipe is already liked

    if (user.following.includes(followingId)) {
      //unlike the recipe
      const index = user.following.indexOf(followingId);
      user.following.splice(index, 1);
      await user.save();
      //remove the user from the other users followers
      const index2 = followingUser.followers.indexOf(user._id);
      followingUser.followers.splice(index2, 1);
      await followingUser.save();
      res
        .status(200)
        .send(
          `User ${req.params.userId} has unfollowed user ${req.params.followingId}.`
        );
      return;
    }

    // Add the recipe to the user's likedRecipes array
    user.following.push(followingId);

    // Save the updated user object
    await user.save();

    // add the user to the other users followers
    followingUser.followers.push(user._id);
    await followingUser.save();

    // send a message that the user is now following the other user
    res
      .status(200)
      .send(
        `User ${req.params.userId} has followed user ${req.params.followingId}.`
      );
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
}
