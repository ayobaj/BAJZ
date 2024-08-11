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
            throw{statusCode: 400, message: 'Password must be atleast 6 characters'}
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw {statusCode: 400, message: 'username exist already'};
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw{statusCode: 400, message: 'Email exist already'}
        }

        const saltRounds = 10; 

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

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
        const token = jwt.sign({id:validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        res
            .status(200)
            .cookie('access_token', token, {httpOnly: true,}).json(rest);


    } catch(error){
        next(error)
    }
}


export const google = async (req, res, next) => {

    const { email, name, googlePhotoUrl } = req.body;

    if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
    }

    try {
        const user = await User.findOne({ email });
        // AUTHENTICATION
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

            const { password, ...rest } = user._doc;

            return res.status(200)
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const saltRounds = 10;
            
            const hashedPassword = bcryptjs.hashSync(generatedPassword, saltRounds);

            const username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3);
            
            // Ensure all required fields are properly passed
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                profilePicture: req.body.googlePhotoUrl,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);

            const { password, ...rest } = newUser._doc;

            return res.status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json(rest);
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};