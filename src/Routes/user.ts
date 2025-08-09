//iske ander app.post put get wagera nhi aaega only Router.post iput delete .....

import express from "express";
const router = express.Router();
import User from "../models/userModel";
import Content from "../models/contentModel";
import { AnyBulkWriteOperation } from "mongoose";
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
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    //For now just consoleing
    res.json({
      success: true,
      message: "Access granted",
      username: user_Data.user_name,
    });
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

// Fetch all notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await Content.find();
    res.status(200).json({ notes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new note
router.post("/notes", async (req, res: any) => {
  try {
    const { title, content } = req.body;
    const newNote = new Content({ title, content });
    await newNote.save();
    res.status(201).json({
      success: true,
      note: newNote,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single note by ID
router.get("/notes/:id", async (req, res: any) => {
  try {
    const { id } = req.params;
    const note = await Content.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ note });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update a note
router.put("/notes/:id", async (req, res: any) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Content.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({
      success: true,
      note: updatedNote,
      message: "Note updated successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a note
router.delete("/notes/:id", async (req, res: any) => {
  try {
    const { id } = req.params;
    const deletedNote = await Content.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Check if user is logged in
router.get("/users/is-logged", async (req, res: any) => {
  try {
    // For now, we'll return a mock response since we don't have session management
    // In a real application, you would check the session/token here
    res.status(200).json({
      success: true,
      username: "demo_user", // This should come from session/token
      message: "User is logged in",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Logout endpoint
router.get("/users/logout", async (req, res: any) => {
  try {
    // For now, we'll return a success response
    // In a real application, you would clear the session/token here
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
