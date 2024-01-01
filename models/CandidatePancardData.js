const mongoose = require("mongoose");

const PanCardDataSchema = new mongoose.Schema({
  nameAsPerPan: { type: String, required: true },
  panNumber: { type: Number, required: true, unique: true },
  userName: { type: String },
  userId: { type: String },
  dob: { type: Date, required: true }
});

const CandidatePancardData = mongoose.model(
  "CandidatePancardData",
  PanCardDataSchema
);

module.exports = CandidatePancardData;
