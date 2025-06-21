//Database logic here
//create user models nad schemas
//clusters's string from mongoDB atlas mongodb+srv://deepu4402020:vAnfa2uLdzrwAzs9@cluster0.vn00iyu.mongodb.net/

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log("MongoDB Connected:");
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
