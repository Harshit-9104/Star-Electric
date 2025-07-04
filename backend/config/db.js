import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://harshit9104:Harshit9104@cluster0.wfb94tc.mongodb.net/STAR-Electric').then(() => console.log("MongoDB connected..."));
}
