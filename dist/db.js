"use strict";
//Database logic here
//create user models nad schemas 
//clusters's string from mongoDB atlas mongodb+srv://deepu4402020:vAnfa2uLdzrwAzs9@cluster0.vn00iyu.mongodb.net/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost:27017/noteApp", {
    dbName: 'NoteApp'
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
//mongoose.connect("mongodb://localhost:27017/noteApp")
