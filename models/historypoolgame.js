const mongoose = require("mongoose");

const Poolhistoryschema = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  username: { type: String },
  userphone: { type: Number },
  status: { type: Number },
  gamePrice: { type: Number }
});

const historypoolgame = mongoose.model("historypoolgame", Poolhistoryschema);

module.exports = historypoolgame;
