const { Router } = require("express");
const userModel = require("../Model/userModel");
const userRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: './src/config/.env' });

const secret = process.env.secretkey;

userRouter.post("/create-user",upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  const userEmail = await userModel.findOne({ email });
  if (userEmail) {
    return res.status(400).send("User already exists");
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      return next(err);
    }

    await userModel.create({
      name: name,
      email: email,
      password: hash,
      // avatar: fileUrl
    });

    res.status(201).send("User created successfully");
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const check = await userModel.findOne({ email: email });

  if (!check) {
    return res.status(400).send("User not found");
  }

  const pass = await bcrypt.compare(password, check.password);

  if (!pass) {
    return res.status(400).send("Password is incorrect");
  }

  jwt.sign({ email: email },secret,(err,token)=>{
    if(err){
      return res.status(400).send("Token creation failed");
    }
    console.log(token);
    res.status(200).send(token);
  })
  res.send("Login successful");
});

module.exports = userRouter;