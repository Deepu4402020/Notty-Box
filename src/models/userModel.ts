// this has Database scehma

import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  user_name: {
    type: String, //string would be our Type script type not valid as runtime value
    required: true,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("User", UserSchema);
export default UserModel;
