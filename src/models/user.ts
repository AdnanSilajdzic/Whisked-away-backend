import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  creationDate: Date,
  bio: String,
  likedFoods: [String],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
