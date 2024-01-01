var express = require("express");
const axios = require("axios");
// const {
//   priceControllerOfGame
// } = require("../controller/Admin.js/Controller.js");

const {
  UserloginData,
  sendOTP,
  UserFetchData,
  updateotp,
  updateotpByname,
  updateotpByNumber,
  getludodatahistory,
  withdrowrejectUpdate,
  GetpancarDetails,
  withdrowrejectGet,
  withdrowapproveUpdate,
  withdrowapproveGet,
  withdrowgetdata,
  walletupdate,
  // getcarromdatahistory,
  getcarromdatahistory,
  carromControllerPrice,
  historycarromplayed,
  withdrow,
  boolControllerPrice,
  getcarromControllerPrice,
  getpoopdatahistory,
  userDetails,
  historypoolplayed,
  historyludoplayed,
  // CarromPriceData,
  candidatepan,
  // getcandidatepandetail,
  LudoControllerPrice,
  GamePriceGet,
  getboolControllerPrice,
  Getalldatauser
} = require("../controller/User/UserLofinController.js");

const router = express.Router();
router.get("/userDetails", userDetails);
router.get("/", async (req, res) => {
  try {
    // Make multiple GET requests
    const [
      userDetailsResponse,
      ludodataResponse,
      pooldataResponse,
      carromdataResponce
    ] = await Promise.all([
      axios.get("http://localhost:7000/userDetails"),
      axios.get("http://localhost:7000/getludodatahistory"),
      axios.get("http://localhost:7000/getpoopdatahistory"),
      axios.get("http://localhost:7000/getcarromdatahistory")
    ]);

    // Extract data from the responses
    const userdata = userDetailsResponse.data;
    const ludodata = ludodataResponse.data;
    const pooldata = pooldataResponse.data;
    const carromdata = carromdataResponce.data;
    // console.log("User Data:", userdata);
    // console.log("Ludo Data:", ludodata);
    // console.log("carrom Data:", carromdata);
    // console.log("pool Data:", pooldata);

    // Render the view with both sets of data
    res.render("index", {
      title: "Dashboard",
      currentRoute: req.url,
      userdata,
      ludodata,
      pooldata,
      carromdata
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.render("error", { error: "Failed to fetch data" });
  }
});

router.get("/admin_role", (req, res) => {
  res.render("admin_role", { title: "Admin Role", currentRoute: req.url });
});

router.get("/player", (req, res) => {
  res.render("player", { title: "Player Master", currentRoute: req.url });
});

router.get("/entryfees", (req, res) => {
  res.render("entryfees", { title: "Entryfees", currentRoute: req.url });
});

router.get("/users-profile", (req, res) => {
  res.render("users-profile", {
    title: "Users Profile",
    currentRoute: req.url
  });
});

router.get("/pages-login", (req, res) => {
  res.render("pages-login", { title: "pages-login", currentRoute: req.url });
});

router.get("/pages-register", (req, res) => {
  res.render("pages-register", {
    title: "pages-register",
    currentRoute: req.url
  });
});

router.get("/pages-contact", (req, res) => {
  res.render("pages-contact", { title: "Bonus", currentRoute: req.url });
});

router.get("/Bonus", (req, res) => {
  res.render("Bonus", { title: "Bonus", currentRoute: req.url });
});

router.get("/Refer", (req, res) => {
  res.render("Refer", { title: "Refer", currentRoute: req.url });
});

router.get("/Win_lose", (req, res) => {
  res.render("Win_lose", { title: "Win", currentRoute: req.url });
});

router.get("/slider", (req, res) => {
  res.render("slider", { title: "Image", currentRoute: req.url });
});

router.get("/tic_re", (req, res) => {
  res.render("tic_re", { title: "Ticket Request", currentRoute: req.url });
});

router.get("/tic_app", (req, res) => {
  res.render("tic_app", { title: "Ticket Approval", currentRoute: req.url });
});

router.get("/rech_rej", (req, res) => {
  res.render("rech_rej", { title: "Recharge Reject", currentRoute: req.url });
});

router.get("/rech_pe", (req, res) => {
  res.render("rech_pe", { title: "Recharge Request", currentRoute: req.url });
});

router.get("/rech_app", (req, res) => {
  res.render("rech_app", { title: "Recharge Approval", currentRoute: req.url });
});

router.get("/Ludo", async (req, res) => {
  try {
    // Make a GET request to the GamePriceGet API
    const response = await axios.get("http://localhost:7000/GamePriceGet");
    const gamePrices = response.data;
    // console.log(gamePrices);
    res.render("Ludo", { title: "Ludo", currentRoute: req.url, gamePrices });
  } catch (error) {
    console.error("Error fetching game prices:", error);
    res.render("error", { error: "Failed to fetch game prices" });
  }
});

// router.get("/Pool", (req, res) => {
//   res.render("Pool", { title: "Pool", currentRoute: req.url });
// });

router.get("/pool", async (req, res) => {
  try {
    // Make a GET request to the GamePriceGet API
    const response = await axios.get(
      "http://localhost:7000/getboolControllerPrice"
    );
    const poolPrices = response.data;
    // console.log(gamePrices);
    res.render("Pool", { title: "Pool", currentRoute: req.url, poolPrices });
  } catch (error) {
    console.error("Error fetching game prices:", error);
    res.render("error", { error: "Failed to fetch game prices" });
  }
});

router.get("/Lobbies", async (req, res) => {
  try {
    // Make a GET request to the GamePriceGet API
    const response = await axios.get("http://localhost:7000/GetpancarDetails");
    const getdetail = response.data;
    // console.log(gamePrices);
    res.render("Lobbies", {
      title: "Lobbies",
      currentRoute: req.url,
      getdetail
    });
  } catch (error) {
    console.error("Error fetching game prices:", error);
    res.render("error", { error: "Failed to fetch game prices" });
  }
});

router.get("/Carrom", async (req, res) => {
  try {
    // Make a GET request to the GamePriceGet API
    const response = await axios.get(
      "http://localhost:7000/getcarromControllerPrice"
    );
    const carromPrices = response.data;
    // console.log(gamePrices);
    res.render("Carrom", {
      title: "Carrom",
      currentRoute: req.url,
      carromPrices
    });
  } catch (error) {
    console.error("Error fetching game prices:", error);
    res.render("error", { error: "Failed to fetch game prices" });
  }
});

router.get("/with_re", (req, res) => {
  res.render("with_re", { title: "Request", currentRoute: req.url });
});

router.get("/with_app", (req, res) => {
  res.render("with_app", { title: "Approval", currentRoute: req.url });
});

router.get("/with_rej", (req, res) => {
  res.render("with_rej", { title: "Reject", currentRoute: req.url });
});

router.post("/UserloginData", UserloginData);

router.get("/UserFetchData", UserFetchData);

router.get("/Getalldatauser/:id", Getalldatauser);

router.post("/updateotp", updateotp);

router.post("/updateotpByname", updateotpByname);

router.post("/updateotpByNumber", updateotpByNumber);

router.post("/LudoControllerPrice", LudoControllerPrice);

router.post("/boolControllerPrice", boolControllerPrice);

router.get("/GetpancarDetails", GetpancarDetails);

router.post("/carromControllerPrice", carromControllerPrice);

router.get("/GamePriceGet", GamePriceGet);

// router.get("/getludodatahistory", getludodatahistory);
router.get("/getcarromControllerPrice", getcarromControllerPrice);

router.get("/getboolControllerPrice", getboolControllerPrice);

// router.get("/getcarromdatahistory", getcarromdatahistory);

router.post("/send-otp", sendOTP);

router.post("/withdrow", withdrow);

router.get("/withdrowgetdata", withdrowgetdata);

router.post("/historycarromplayed", historycarromplayed);

router.post("/historypoolplayed", historypoolplayed);

router.post("/historyludoplayed", historyludoplayed);

router.get("/getpoopdatahistory", getpoopdatahistory);

router.get("/getludodatahistory", getludodatahistory);

router.get("/getcarromdatahistory", getcarromdatahistory);

router.post("/walletupdate", walletupdate);

router.post("/withdrowapprovePost", withdrowapproveUpdate);

router.get("/withdrowapproveGet", withdrowapproveGet);

router.get("/withdrowrejectGet", withdrowrejectGet);

router.post("/withdrowrejectPost", withdrowrejectUpdate);

// router.post("/CarromPriceData", CarromPriceData);

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images"); // Set the destination folder for storing images
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original filename for storing
//   }
// });

// const upload = multer({ storage: storage });

router.post("/candidatepan", candidatepan);
// router.post("/candidatepan", upload.single("photo"), candidatepan);
// router.get("/getcandidatepandetail", getcandidatepandetail);
// app.post("/submit-form");
// const functionludohistory = async (datagame) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:7000/historyludoplayed",
//       datagame,
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );
//     if (response) {
//       await dispatch(fetchDataofludohistory());
//     }
//     // console.log("ho gya history submit ludowala", response.data);
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     if (error.response) {
//       console.error("Response data:", error.response.response);
//     }
//   }
// };

module.exports = router;
