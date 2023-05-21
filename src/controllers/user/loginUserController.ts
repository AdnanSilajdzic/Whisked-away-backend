import { Request, Response } from 'express';
import User from '../../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

export async function loginUserController(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			res.status(400).json({ message: 'Please enter all fields' });
			return;
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			res.status(400).json({ message: 'User does not exist' });
			return;
		}

		//check if password is correct
		const isMatch = await bcrypt.compare(password, user.password!);
		if (!isMatch) {
			res.status(400).json({ message: 'Invalid credentials' });
			return;
		}

		// Either 7d in milliseconds, or 1d in milliseconds
		const expireLength = 1000 * 60 * 60 * 24;
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
			expiresIn: expireLength,
		});

		return res.status(200).json({
			user: {
				id: user._id,
				email,
				creationDate: user.creationDate,
				name: user.name,
				bio: user.bio,
				likedFoods: user.likedFoods,
				following: user.following,
				followers: user.followers,
				savedRecipes: user.savedRecipes,
				likedRecipes: user.likedRecipes,
				recipes: user.recipes,
				image: user.image,
			},
			token,
		});
	} catch (error) {
		res.json(error);
	}
}
