import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authenticateRoute.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import path from 'path';

dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();

app.use('/api/user', userRoutes);
app.use('/api/authenticate', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


app.use(express.static(path.join(__dirname, '/frontend/dist')));


app.get('*', (req, res ) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})


// Handling of error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message ||'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })    
});


//connection to MONGODB
mongoose
.connect(process.env.MONGO)
.then(()=> console.log('DataBase is connected!'))
.catch((err) => {
    console.log(err)
})

//PORT ON WHICH THE SERVER IS RUNNING
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

