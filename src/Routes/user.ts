//iske ander app.post put get wagera nhi aaega only Router.post iput delete .....

import express from "express";
const router = express.Router();
import User from "../models/userModel";
import ContentModel from "../models/contentModel";
//Routes

//CRUD Operation

//why using post req for signing
router.post("/signin", async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const user_Data = await User.findOne({ username });
    if (!user_Data) return res.json({ error: "No user found" });
    const corr_Password = user_Data.password;
    if (password != corr_Password) {
      return res.status(401).json({ Error: "Incorrrect credentials" });
    }

    //For now just consoleing
    res.json({ messsage: "Access granted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  console.log("received signup");
  try {
    if (!req.body) {
      console.log("missing body");
    }
    const { username, password } = req.body;
    const new_User = new User({ username, password });
    await new_User.save();

    console.log("saved", new_User);
    res.status(200).json({
      success: true,
      message: "Done creating new User",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/content", async (req, res) => {
  const { content } = req.body;
  try {
    const updated_Content = new ContentModel({ content });
    await updated_Content.save();
    res.status(200).json({
      success: true,
      message: "Content saved successfully",
      data: updated_Content,
    });
  } catch (err: any) {
    res.status(400).json({
      error: err.message,
    });
  }
});

router.post("/brain/:shareLink", async (req, res: any) => {
  try {
    const { shareLink } = req.params;
    const content = await ContentModel.findOne({ shareLink });
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res: any) => {
  try {
    const { username, password } = req.body;
    const user_Data = await User.findOne({ username });
    if (!user_Data) return res.status(404).json({ error: "User not found" });

    const corr_Password = user_Data.password;
    if (password !== corr_Password) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const userContent = await ContentModel.find({ userId: user_Data._id });
    res.status(200).json({
      success: true,
      message: "Content retrieved successfully",
      data: userContent,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
