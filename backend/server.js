const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-commers-1.netlify.app"],
    credentials: true,
  }),
);

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/products"));
app.use("/api", require("./routes/checkout"));
app.use("/api", require("./routes/otp"));
app.use("/auth", require("./routes/googleAuth"));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
