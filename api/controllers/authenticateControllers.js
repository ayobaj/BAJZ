import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            throw{statusCode: 400, message: 'All fields are required'}
        }

        // Check password length
        if (password.length < 6) {
            throw{statusCode: 400, message: 'Password must be atleast 6 characters '}
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw {statusCode: 400, message: 'username exist already'};
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw{statusCode: 400, message: 'Email is already registered'}
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.json({ message: 'Signup successful' });

    } catch (error) {
        // Handle errors
        next(error);
    }
};
