//iske ander app.post put get wagera nhi aaega only Router.post iput delete .....

import express from "express";
const router = express.Router();
import User from "../models/userModel";
import Content from "../models/contentModel";
//Routes

//CRUD Operation

//why using post req for signing
router.post("/signin", async (req: any, res: any) => {
  try {
    const { user_name, password } = req.body;
    const user_Data = await User.findOne({ user_name });
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
router.post("/signup", async (req, res: any) => {
  console.log("received signup");
  try {
    const { user_name, password } = req.body;

    // Validate input
    if (!user_name || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ user_name });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Create new user
    const new_User = new User({ user_name, password });
    await new_User.save();

    console.log("saved", new_User);
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/content", async (req, res) => {
  const { content } = req.body;
  try {
    const updated_Content = new Content({ content });
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
    const content = await Content.findById(shareLink);
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
    const { user_name, password } = req.body;
    const user_Data = await User.findOne({ user_name });
    if (!user_Data) return res.status(404).json({ error: "User not found" });

    const corr_Password = user_Data.password;
    if (password !== corr_Password) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const userContent = await Content.find({ userId: user_Data._id });
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
