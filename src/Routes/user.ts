
//iske ander app.post put get wagera nhi aaega only Router.post iput delete .....

import express from 'express';
//const express = require("express");
const router = express.Router();
import User from "../models/userModel";
//const User = require("../models/userModel");
//Routes

//CRUD Operation

router.post("/signin", (req, res) => {});

router.post("/signup", async (req, res) => {
  console.log("received signup");
  try {
    const { user_name, password } = req.body;
    const new_User = new User({ user_name, password });
    await new_User.save();
    console.log("saved",new_User);
    res.status(200).json({
      success: true,
      message: "Done creating new User",
    });
  } catch (err:any) {
    res.status(500).json({ error : err.message});
  }
});




// router.post("./api/v1/content", (req, res) => {});
// router.get("./api/v1/brain/:shareLink", (req, res) => {
//   const sharelink = req.params;
// });

// router.post("./users", async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(200).json(err);
//   }
// });

export default router; 
