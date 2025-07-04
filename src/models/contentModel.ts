import { Schema, model } from "mongoose";

const contentSchema = new Schema(
  {
    title: {
      type: String,
      default: "Untitled Note",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel = model("Content", contentSchema, "Contents");

export default ContentModel;
/*
 */
