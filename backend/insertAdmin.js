const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Adjust the path as necessary
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const insertAdmin = async () => {
    try {
        const username = 'admin'; //type your username here to insert in db
        const password = '1234'; // type your password here to insert in db

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();
        console.log(`Inserted successfully as ${username} and password as ${password} in the database`);
    } catch (error) {
        console.error('Error inserting admin user:', error);
    } finally {
   
        mongoose.connection.close();
    }
};

// Run the function to insert the admin user
insertAdmin();