import { Schema, model } from "mongoose";

const contentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel = model("Content", contentSchema);

export default ContentModel;
