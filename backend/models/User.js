const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    socialHandle: String,
    imageUrl: String,
});

module.exports = mongoose.model('Submission', userSchema);