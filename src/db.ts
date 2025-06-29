//Database logic here
//create user models nad schemas
//clusters's string from mongoDB atlas mongodb+srv://deepu4402020:vAnfa2uLdzrwAzs9@cluster0.vn00iyu.mongodb.net/
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    //why "as string" not :String ?
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
