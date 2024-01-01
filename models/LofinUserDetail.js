const mongoose = require("mongoose");

const loginDetails = new mongoose.Schema({
  // Define properties and their types with validation rules
  username: { type: String },
  name: { type: String },
  userphone: {
    type: Number,
    required: true
  },
  img: { type: String }, // Store the image as Buffer
  userotp: { type: Number, required: true },
  reffralcode: { type: String },
  wallet: { type: Number },
  usereffral: { type: String },
  bonas: { type: Number },
  verification: { type: Number },
  winnerPrice: { type: Number },
  date: { type: Date }
});

const userloginDatas = mongoose.model("userloginDatas", loginDetails);

module.exports = userloginDatas;
