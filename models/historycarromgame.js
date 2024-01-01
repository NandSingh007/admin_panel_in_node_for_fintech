const mongoose = require("mongoose");

const Carromhistoryschema = new mongoose.Schema({
  gameName: { type: String },
  winerPrice: { type: Number },
  logoimg: { type: String },
  player: { type: Number },
  username: { type: String },
  userphone: { type: Number },
  gamePrice: { type: Number },
  status: { type: Number }
});
const historycarromgame = mongoose.model(
  "historycarromgame",
  Carromhistoryschema
);
module.exports = historycarromgame;
