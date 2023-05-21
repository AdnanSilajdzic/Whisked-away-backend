import multer from 'multer';
import { Express } from 'express';
import path from 'path';

//middleware for uploading images that sends the name of the image to the controller
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../images/recipe'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const uploadImage = multer({ storage: storage }).single('image');

export default uploadImage;
