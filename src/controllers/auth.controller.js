const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8
    ) {
      return res.status(400).json({
        message:
          "Name, valid email, and password of at least 8 characters are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    console.log({ existingUser });

    if (existingUser && existingUser !== null) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (e) {
    console.log("an error happened");
    console.log(e);
    next(e);
  }
};

module.exports = { register };
