const mongoose = require("mongoose");
const WithdraApproveshema = new mongoose.Schema({
  userName: { type: String },
  amount: { type: Number },
  userPhone: { type: Number },
  currentDate: { type: Date },
  status: { type: Number }
});

const withdraPostapprove = mongoose.model(
  "withdraPostapprove",
  WithdraApproveshema
);

module.exports = withdraPostapprove;
