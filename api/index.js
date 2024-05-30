import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authenticateRoute.js';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/authenticate', authRoutes);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message ||'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })    
});





mongoose
.connect(process.env.MONGO)
.then(()=> console.log('DataBase is connected!'))
.catch((err) => {
    console.log(err)
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})