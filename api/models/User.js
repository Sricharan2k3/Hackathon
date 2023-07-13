const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true, min: 4 },
  lastname: { type: String, required: true, min: 4, unique: true },
  companyname: { type: String, required: true, min: 4, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, max: 10, min: 10 },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
