const mongoose = require("mongoose");

const Bolpool = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  gamePrice: { type: Number },
  status: { type: String }
});

const BolpoolPriceData = mongoose.model("BolpoolPriceData", Bolpool);

module.exports = BolpoolPriceData;
