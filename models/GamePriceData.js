const mongoose = require("mongoose");

const LudoPrice = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  gamePrice: { type: Number },
  status: { type: String }
});

const GamePriceData = mongoose.model("GamePriceData", LudoPrice);

module.exports = GamePriceData;
