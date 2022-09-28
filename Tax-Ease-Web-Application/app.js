const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./db/db");
const User = require("./db/models/user");
const NTN = require("./db/models/ntn");
const AOP = require("./db/models/aop");
const Sole = require("./db/models/sole");
const dotenv = require("dotenv");
const Tax = require("./db/models/tax");
const Lawyers = require("./db/models/lawyer");
const compression = require("compression");
const Compliance = require("./db/models/compliance");

const app = express();
connectDB();
dotenv.config({ path: "./keys.env" });

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "client", "public", "Uploads"))
);
app.use(
  "/",
  express.static(path.resolve(__dirname, "client", "public", "index.html"))
);

const limit = bodyParser.urlencoded({ limit: "50mb" });

app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/user", require("./routes/index"));

app.get("/hello", (req, res) => {
  return res.json({
    message: "Hello there",
  });
});

app.post("/upload/ntn-data", limit, async (req, res) => {
  const { id, email, fileData, oId } = req.body;
  // console.log("NTN ---->", fileData);
  try {
    const data = new NTN({
      id,
      email,
      fileData,
      oId,
    });
    await data.save();
    return res.json({
      message: "Uploaded successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal server error",
    });
  }
});

app.post("/change-status/:id", async (req, res) => {
  const { id } = req.params;
  const { oId, text } = req.body;
  console.log(oId, id);
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      const order = user.orders.find((o) => o.oId === oId);
      order.status = text;
      await user.save();
    }
  } catch (error) {}
});

app.post("/place-order/:id", async (req, res) => {
  // console.log("Order", req.body);
  const { data, id } = req.body;
  try {
    const user = await User.findById({ _id: id });
    user.orders.push({ title: data.title, status: data.status, oId: data.oId });
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload/tax/docs", async (req, res) => {
  const files = req.files.fileData;
  files.forEach((file) => {
    file.mv(`${__dirname}/client/public/Uploads/TAX/${file.name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.post("/upload/aop", async (req, res) => {
  const { id, business, email, phone, filesData, oId } = req.body;
  try {
    const aopUser = new AOP({
      id,
      business,
      email,
      phone,
      filesData,
      oId,
    });
    await aopUser.save();

    return res.json({
      message: "Succesfully uploaded",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal Server Error",
      success: false,
    });
  }
});

app.post("/upload/sole", async (req, res) => {
  const { id, business, email, phone, filesData, oId } = req.body;
  console.log(req.body);

  try {
    const soleUser = new Sole({
      id,
      business,
      email,
      phone,
      filesData,
      oId,
    });
    await soleUser.save();

    return res.json({
      message: "Succesfully uploaded",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "internal Server Error",
      success: false,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      return res.json({
        user,
        message: "login successful",
        success: true,
      });
    } else {
      return res.json({
        message: "Invalid credentials!",
        success: false,
      });
    }
  } catch (error) {
    return res.json({
      message: "internal server error",
    });
  }
});

app.post("/user/file-tax-return", async (req, res) => {
  console.log("TAX", req.body);
  try {
    const newInstant = new Tax(req.body);

    await newInstant.save();

    return res.json({
      message: "Successfully Submitted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.post("/user/compliance", async (req, res) => {
  console.log("Comp ---->", req.body);
  try {
    const newInstant = new Compliance(req.body);

    await newInstant.save();

    return res.json({
      message: "Successfully Submitted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.get("/api/aop/requests/", async (req, res) => {
  try {
    const users = await AOP.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/sole/requests/", async (req, res) => {
  try {
    const users = await Sole.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/ntn/requests/", async (req, res) => {
  try {
    const users = await NTN.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/tax/requests/", async (req, res) => {
  try {
    const users = await Tax.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
app.get("/api/comp/requests/", async (req, res) => {
  try {
    const users = await Compliance.find();
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.get("/api/aop-user/aop/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await AOP.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});
app.get("/api/comp-user/comp/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Compliance.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});

app.get("/api/ntn-user/ntn/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await NTN.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});
app.get("/api/sole-user/sole/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Sole.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});
app.get("/api/tax-user/tax/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Tax.findOne({ _id: id });
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
});

app.get("/api/lawyers", async (req, res) => {
  try {
    const data = await Lawyers.find();
    return res.json({
      data,
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error",
    });
  }
});

app.post("/api/add-lawyer", async (req, res) => {
  try {
    await Lawyers.create(req.body);
    return res.json({
      message: "Successfully Created",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   app.use(
//     "/uploads",
//     express.static(path.resolve(__dirname, "client", "build", "Uploads"))
//   );
//   app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
