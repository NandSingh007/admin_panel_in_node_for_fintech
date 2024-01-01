const mongoose = require("mongoose");

const Poolhistoryschema = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  username: { type: String },
  userphone: { type: Number },
  gamePrice: { type: Number },
  status: { type: Number }
});

const historyluodgame = mongoose.model("historyluodgame", Poolhistoryschema);

module.exports = historyluodgame;
