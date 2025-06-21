import { Schema, model } from "mongoose";

const contentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
});

const ContentModel = model("Content", contentSchema, "Contents");

export default ContentModel;
