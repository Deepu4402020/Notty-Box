//Database logic here
//create user models nad schemas 
//clusters's string from mongoDB atlas mongodb+srv://deepu4402020:vAnfa2uLdzrwAzs9@cluster0.vn00iyu.mongodb.net/



import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {//Can also use .env file to store link for security purposes
    const conn = await mongoose.connect('mongodb+srv://deepu4402020:vAnfa2uLdzrwAzs9@cluster0.vn00iyu.mongodb.net/', {
    //  useNewUrlParser: true,
    });

    console.log("MongoDB Connected:" );
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
  //mongoose.connect("mongodb://localhost:27017/noteApp")