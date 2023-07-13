const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User1 = require("./models/User1");
const Post1 = require("./models/Post1");

const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://namasricharan:OMXGj4flD6Ef5oEL@cluster0.a3jcyh1.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { firstname, lastname, companyname, email, mobile, password } =
    req.body;
  try {
    const userDoc = await User1.create({
      firstname: firstname,
      lastname: lastname,
      companyname: companyname,
      email: email,
      mobile: mobile,

      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User1.findOne({ email });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        email,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/post", async (req, res) => {
  const {
    companyName,
    email,
    jobCategory,
    jobTitle,
    jobDescription,
    expectedSalary,
  } = req.body;
  try {
    const userDoc = await Post1.create({
      companyName: companyName,
      email: email,
      jobCategory: jobCategory,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      expectedSalary: expectedSalary,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// app.get("/post", async (req, res) => {
//   console.log(post)
//   res.json(await Post1.find());

// });
app.get("/post", async (req, res) => {
  try {
    const posts = await Post1.find();
    console.log(posts); // Log the data to the console
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get posts" });
  }
});

app.listen(4000);
// Tb5pqPBgn3QChW0O;
// mongodb+srv://sricharan:Tb5pqPBgn3QChW0O@cluster0.4ligio0.mongodb.net/?retryWrites=true&w=majority
