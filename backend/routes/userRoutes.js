const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
    },
});

const upload = multer({ storage: storage });

router.post('/submit', upload.single('image'), async (req, res) => {
    const { name, socialHandle } = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = req.file.path;

    const newUser = new User({ name, socialHandle, imageUrl });
    await newUser.save();
    res.status(201).json(newUser);
});
module.exports = router;