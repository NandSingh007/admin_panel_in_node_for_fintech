const mongoose = require("mongoose");

const Carrom = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  gamePrice: { type: Number },
  status: { type: String }
});

const CarromPriceData = mongoose.model("CarromPriceData", Carrom);

module.exports = CarromPriceData;
