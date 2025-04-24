import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aman:aman123@cluster0.hhknp.mongodb.net/SrivastavaFood').then(() => console.log("db connected"));
}