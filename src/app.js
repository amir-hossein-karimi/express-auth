const express = require("express");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model");

const authRoutes = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

app.get("/users", async (req, res, next) => {
  const users = await UserModel.find();

  console.log({ users });

  res.status(200).json(users);
});

app.use("/auth", authRoutes);

module.exports = app;
