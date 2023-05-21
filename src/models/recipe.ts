import mongoose from 'mongoose';

const Schema = mongoose.Schema;
//const ObjectId = mongoose.Types.ObjectId;

const RecipeSchema = new Schema({
	name: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	ingredients: [String],
	tags: [String],
	serves: Number,
	cookTime: Number,
	instructions: String,
	image: String,
	likes: { type: Number, default: 0 },
	saves: { type: Number, default: 0 },
});

const RecipeModel = mongoose.model('Recipe', RecipeSchema);

export default RecipeModel;
