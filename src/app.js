const express = require("express");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/user.model");

const authRoutes = require("./routes/auth.route");
const authenticate = require("./middlewares/auth.middleware");

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

app.get("/users/me", authenticate, (req, res) => {
  console.log({ user: req.user });

  res.status(200).json({ message: "test" });
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    success: false,
    message:
      err.status && err.status < 500 ? err.message : "Internal server error",
  });
});

module.exports = app;
