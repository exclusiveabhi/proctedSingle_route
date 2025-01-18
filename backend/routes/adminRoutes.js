const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

router.get('/submissions', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, 'secret');
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;