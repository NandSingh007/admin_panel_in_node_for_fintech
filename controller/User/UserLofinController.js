const Jwt = require("jsonwebtoken");
const userloginDatas = require("../../models/LofinUserDetail");
const GamePriceData = require("../../models/GamePriceData");
const BolpoolPriceData = require("../../models/BolpoolPriceData");
const historyluodgame = require("../../models/historyluodgame");
const historycarromgame = require("../../models/historycarromgame");
// const withdraPostreject = require("../../models/withdraPostreject");
const historypoolgame = require("../../models/historypoolgame");
const withdraPostData = require("../../models/withdraPostData");
// const withdraPostapprove = require("../../models/withdraPostapprove");
const CarromPriceData = require("../../models/CarromPriceData");
const multer = require("multer");
const path = require("path");
const CandidatePancardData = require("../../models/CandidatePancardData");
const fs = require("fs");
const axios = require("axios");

// const userloginDatas = require("../../models/LofinUserDetail");

exports.UserloginData = async (req, res, next) => {
  try {
    const {
      username,
      name,
      usereffral,
      verification,
      wallet,
      userphone,
      img,
      date,
      reffralcode,
      bonas,
      userotp,
      winnerPrice
    } = req.body;

    // Check if userphone already exists
    const existingUser = await userloginDatas.findOne({ userphone: userphone });
    if (existingUser) {
      const expiresIn = Math.floor(
        (Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000
      ); // 30 days expiration

      const token = Jwt.sign(
        {
          _id: existingUser._id,
          userphone: existingUser.userphone,
          username: existingUser.username,
          name: existingUser.name,
          usereffral: existingUser.usereffral,
          wallet: existingUser.wallet,
          date: existingUser.date,
          img: existingUser.img,
          reffralcode: existingUser.reffralcode,
          bonas: existingUser.bonas,
          winnerPrice: existingUser.winnerPrice
        },
        "MySecretKey",
        { expiresIn: expiresIn } // expiresIn is in seconds
      );
      return res.status(201).json({
        existingUser,
        message: "already exist this number",
        token: token
      });
    } else {
      // If userphone does not exist, create a new user
      const newUser = new userloginDatas({
        username,
        name,
        usereffral,
        verification,
        wallet,
        img,
        userphone,
        date,
        reffralcode,
        bonas,
        winnerPrice,
        userotp
      });
      const savedUser = await newUser.save();
      res.status(250).json(savedUser);
    }
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.UserFetchData = async (req, res, next) => {
  try {
    const data = await userloginDatas.find({}, "userphone userotp");
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.Getalldatauser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await userloginDatas.find({ _id: id });
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.userDetails = async (req, res, next) => {
  try {
    const data = await userloginDatas.find();
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateotp = async (req, res, next) => {
  const { userId, newOtp } = req.body;

  try {
    const updatedUser = await userloginDatas.findOneAndUpdate(
      { _id: userId },
      { $set: { userotp: newOtp } },
      { new: true }
    );

    if (updatedUser) {
      // Set the expiration date to one month from now
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      // Calculate the difference in seconds between the current date and the expiration date
      const expiresIn = Math.floor(
        (Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000
      ); // 30 days expiration

      // Sign the JWT token with an expiration date
      const token = Jwt.sign(
        {
          _id: updatedUser._id,
          userphone: updatedUser.userphone,
          username: updatedUser.username,
          name: updatedUser.name,
          usereffral: updatedUser.usereffral,
          wallet: updatedUser.wallet,
          date: updatedUser.date,
          img: updatedUser.img,
          reffralcode: updatedUser.reffralcode,
          bonas: updatedUser.bonas
        },
        "MySecretKey",
        { expiresIn: expiresIn } // expiresIn is in seconds
      );
      res.status(200).send({
        msg: "Update Successfully",
        status: true,
        token: token
      });
    } else {
      res.status(400).send({
        msg: "Error",
        status: false
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateotpByname = async (req, res, next) => {
  const { profiledata, tokenid } = req.body;

  try {
    // Check if the new username is already taken
    const isUsernameTaken = await userloginDatas.exists({
      username: profiledata.username,
      _id: tokenid // Exclude the current user from the check
    });

    if (isUsernameTaken) {
      return res.status(400).json({
        msg: "Username is already taken",
        status: false
      });
    }

    // If the username is not taken, proceed with the update
    const updatedNewUser = await userloginDatas.findOneAndUpdate(
      { _id: tokenid },
      {
        $set: {
          name: profiledata.name,
          username: profiledata.username,
          img: profiledata.img
        }
      },
      { new: true }
    );

    if (updatedNewUser) {
      // Set the expiration date to one month from now
      console.log(updatedNewUser);
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      // Calculate the difference in seconds between the current date and the expiration date
      const expiresIn = Math.floor(
        (expirationDate.getTime() - Date.now()) / 1000
      );

      // Sign the JWT token with an expiration date
      const token = Jwt.sign(
        {
          _id: updatedNewUser._id,
          userphone: updatedNewUser.userphone,
          username: updatedNewUser.username,
          name: updatedNewUser.name,
          usereffral: updatedNewUser.usereffral,
          userotp: updatedNewUser.userotp,
          wallet: updatedNewUser.wallet,
          date: updatedNewUser.date,
          img: updatedNewUser.img,
          reffralcode: updatedNewUser.reffralcode,
          bonas: updatedNewUser.bonas
        },
        "MySecretKey",
        { expiresIn: expiresIn } // expiresIn is in seconds
      );

      res.status(200).send({
        msg: "Update Successfully",
        status: true,
        token: token
      });
    } else {
      res.status(400).send({
        msg: "Error",
        status: false
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateotpByNumber = async (req, res, next) => {
  const { updatedFormData, tokenid } = req.body;
  try {
    const isNumberTaken = await userloginDatas.exists({
      userphone: updatedFormData.updateNumber,
      _id: tokenid // Exclude the current user from the check
    });

    if (isNumberTaken) {
      return res.status(400).json({
        msg: "Number is already taken",
        status: false
      });
    }

    const updatedNewphone = await userloginDatas.findOneAndUpdate(
      { _id: tokenid },
      {
        $set: {
          userphone: updatedFormData.updateNumber,
          userotp: updatedFormData.userotp
        }
      },
      { new: true }
    );

    if (updatedNewphone) {
      // Set the expiration date to one month from now
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      // Calculate the difference in seconds between the current date and the expiration date
      const expiresIn = Math.floor(
        (expirationDate.getTime() - Date.now()) / 1000
      );

      // Sign the JWT token with an expiration date
      const token = Jwt.sign(
        {
          _id: updatedNewphone._id,
          userphone: updatedNewphone.userphone,
          username: updatedNewphone.username,
          userotp: updatedNewphone.userotp,
          name: updatedNewphone.name,
          usereffral: updatedNewphone.usereffral,
          wallet: updatedNewphone.wallet,
          date: updatedNewphone.date,
          img: updatedNewphone.img,
          reffralcode: updatedNewphone.reffralcode,
          bonas: updatedNewphone.bonas
        },
        "MySecretKey",
        { expiresIn: expiresIn } // expiresIn is in seconds
      );
      res.status(200).send({
        msg: "Update Successfully",
        status: true,
        token: token
      });
    } else {
      res.status(400).send({
        msg: "Error",
        status: false
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.sendOTP = async (req, res, next) => {
  try {
    const { userphone, userotp } = req.body;
    // console.log("le bhai me bhi aa gya", userphone, userotp);
    const response = await axios.get("https://sms.bulksmslab.com/SMSApi/send", {
      params: {
        userid: "gamezone",
        password: "Royal@12",
        sendMethod: "quick",
        mobile: userphone, // Use the correct phone number
        msg: `Your+OTP+is${userotp}for+Phone+Verification.OTPSTE`,
        senderid: "OTPSTE",
        msgType: "text",
        duplicatecheck: true,
        output: "json"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.LudoControllerPrice = async (req, res, next) => {
  try {
    const { gameName, gamePrice, winerPrice, logoimg, player, status } =
      req.body;
    const newUser = new GamePriceData({
      gameName,
      gamePrice,
      winerPrice,
      logoimg,
      player,
      status
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.boolControllerPrice = async (req, res, next) => {
  try {
    const { gameName, gamePrice, winerPrice, logoimg, player, status } =
      req.body;
    const newUser = new BolpoolPriceData({
      gameName,
      gamePrice,
      winerPrice,
      logoimg,
      player,
      status
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.carromControllerPrice = async (req, res, next) => {
  try {
    const { gameName, gamePrice, winerPrice, logoimg, player, status } =
      req.body;
    const newUser = new CarromPriceData({
      gameName,
      logoimg,
      gamePrice,
      winerPrice,
      player,
      status
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
exports.GamePriceGet = async (req, res, next) => {
  try {
    const data = await GamePriceData.find();
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getboolControllerPrice = async (req, res, next) => {
  try {
    const data = await BolpoolPriceData.find();
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getcarromControllerPrice = async (req, res, next) => {
  try {
    const data = await CarromPriceData.find();
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.walletupdate = async (req, res, next) => {
  const { IdOfUser, wallet } = req.body;
  console.log(wallet);
  try {
    const updatedUser = await userloginDatas.findOneAndUpdate(
      { _id: IdOfUser },
      { $set: { wallet: wallet } },
      { new: true }
    );
    res.status(200).json("successful");
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/img/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });
exports.candidatepan = async (req, res, next) => {
  try {
    const { panNumber, nameAsPerPan, dob, userName, userId } = req.body;
    console.log(panNumber, nameAsPerPan, dob);
    const newUser = new CandidatePancardData({
      panNumber,
      nameAsPerPan,
      userId,
      userName,
      dob
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
exports.historypoolplayed = async (req, res, next) => {
  try {
    const {
      gamePrice,
      player,
      winerPrice,
      logoimg,
      gameName,
      userphone,
      username,
      status
    } = req.body;
    const newUser = new historypoolgame({
      gameName,
      gamePrice,
      player,
      username,
      userphone,
      winerPrice,
      logoimg,
      status
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

exports.getpoopdatahistory = async (req, res, next) => {
  try {
    const data = await historypoolgame.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.historyludoplayed = async (req, res, next) => {
  try {
    const {
      gameName,
      gamePrice,
      player,
      username,
      userphone,
      winerPrice,
      status,
      logoimg
    } = req.body;
    const newUser = new historyluodgame({
      gameName,
      gamePrice,
      player,
      username,
      userphone,
      winerPrice,
      status,
      logoimg
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
exports.getludodatahistory = async (req, res, next) => {
  try {
    const data = await historyluodgame.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.historycarromplayed = async (req, res, next) => {
  try {
    const {
      gameName,
      gamePrice,
      player,
      username,
      userphone,
      winerPrice,
      status,
      logoimg
    } = req.body;
    const newUser = new historycarromgame({
      gameName,
      gamePrice,
      player,
      username,
      userphone,
      winerPrice,
      logoimg,
      status
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
exports.getcarromdatahistory = async (req, res, next) => {
  try {
    const data = await historycarromgame.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.withdrow = async (req, res, next) => {
  try {
    const { userName, userPhone, amount, currentDate, status } = req.body;
    const newUser = new withdraPostData({
      userName,
      userPhone,
      amount,
      status,
      currentDate
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
exports.withdrowgetdata = async (req, res, next) => {
  try {
    const response = await withdraPostData.find();
    // res.render("with_re", { response });s
    res.json(response); // You can remove this line if not needed
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.withdrowapprovePost = async (req, res, next) => {
//   try {
//     const { userName, userPhone, amount, currentDate, status } = req.body;
//     const newUser = new withdraPostapprove({
//       userName,
//       userPhone,
//       amount,
//       status,
//       currentDate
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "ValidationError") {
//       return res.status(400).json({ error: error.message });
//     }
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.withdrowapproveGet = async (req, res, next) => {
  try {
    const response = await withdraPostData.find();
    res.json(response); // You can remove this line if not needed
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.withdrowrejectPost = async (req, res, next) => {
//   try {
//     const { userName, userPhone, amount, currentDate, status } = req.body;
//     const newUser = new withdraPostreject({
//       userName,
//       userPhone,
//       status,
//       amount,
//       currentDate
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error(error);
//     if (error.name === "ValidationError") {
//       return res.status(400).json({ error: error.message });
//     }
//     res.status(500).json({ error: "Server error" });
//   }
// };
exports.withdrowrejectGet = async (req, res, next) => {
  try {
    const response = await withdraPostData.find();
    res.json(response); // You can remove this line if not
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.withdrowapproveUpdate = async (req, res, next) => {
  const { status, _id } = req.body;

  try {
    const updatedUser = await withdraPostData.findOneAndUpdate(
      { _id: _id },
      { $set: { status: status } },
      { new: true }
    );

    if (updatedUser) {
      // Set the expiration date to one month from now
      res.status(200).send({
        msg: "Update Successfully",
        status: true,
        token: token
      });
    } else {
      res.status(400).send({
        msg: "Error",
        status: false
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.withdrowrejectUpdate = async (req, res, next) => {
  const { status, _id } = req.body;

  try {
    const updatedUser = await withdraPostData.findOneAndUpdate(
      { _id: _id },
      { $set: { status: status } },
      { new: true }
    );

    if (updatedUser) {
      // Set the expiration date to one month from now
      res.status(200).send({
        msg: "Update Successfully",
        status: true,
        token: token
      });
    } else {
      res.status(400).send({
        msg: "Error",
        status: false
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.GetpancarDetails = async (req, res, next) => {
  try {
    const response = await CandidatePancardData.find();
    res.json(response); // You can remove this line if not
    console.log(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
