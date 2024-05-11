import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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


export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        // CONDITIONS FOR CHEKING THE EMAIL AND PASSWORD
        if(!email || !password || email === '' || password === ''){
            throw{statusCode: 400, message: 'All fields are required'}
        }

        const validUser = await User.findOne({email})
            if(!validUser){
                throw{statusCode: 400, message:'user not found!'}
            }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            throw{statusCode: 400, message:'Invalid password'}
        }

        // USER AUTHENTICATION
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        res
            .status(200)
            .cookie('access_token', token, {httpOnly: true,}).json(rest);


    } catch(error){
        next(error)
    }
}
