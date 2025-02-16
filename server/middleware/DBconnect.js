import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DBconnect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));
}

export default DBconnect;