const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  companyName: { type: String, required: true, min: 4 },
  email: { type: String, required: true, min: 4, unique: true },
  jobCategory: { type: String, required: true, min: 4 },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true, min: 30 },
  expectedSalary: { type: Number, required: true },
});

const UserModel = model("Post1", UserSchema);

module.exports = UserModel;
