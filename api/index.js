import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';



dotenv.config();
const app = express();
const port = 5000;


mongoose
.connect(process.env.MONGO)
.then(()=> console.log('DataBase is connected!'))
.catch((err) => {
    console.log(err)
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})