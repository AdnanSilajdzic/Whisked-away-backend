import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const RecipeSchema = new Schema({
  name: String,
  ingredients: [String],
  instructions: String,
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

export default RecipeModel;
