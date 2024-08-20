const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const {
  DOCUMENT_NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  DEFAULT_ERROR,
  UNAUTHORIZED_ERROR,
  REQUEST_CONFLICT,
} = require("../utils/errors");

const createUser = async (req, res) => {
  const { name, avatar, email, password } = req.body;

  console.log("Received body:", req.body);

  if (!email || !password) {
    console.error("Missing email or password:", { email, password });
    return res
      .status(VALIDATION_ERROR)
      .send({ message: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const { password: pwd, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).send({ data: userWithoutPassword });
  } catch (err) {
    console.error("createUser error name:", err.name);
    if (err.name === "ValidationError") {
      return res.status(VALIDATION_ERROR).send({ message: "Invalid data" });
    }
    if (err.code === 11000) {
      return res.status(REQUEST_CONFLICT).send({
        message: "User with this email already exists",
      });
    }
    return res
      .status(DEFAULT_ERROR)
      .send({ message: "An error has occurred on the server." });
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(VALIDATION_ERROR)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password) // Add return here
    .then((user) => {
      console.log("user object from the login controller", user);

      // Generate JWT
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.message);

      if (err.message === "Incorrect password or email") {
        return res
          .status(UNAUTHORIZED_ERROR)
          .send({ message: "Incorrect password or email" });
      }

      return res.status(DEFAULT_ERROR).send({
        message: "Internal server error from the catch in the login controller",
      });
    });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(DOCUMENT_NOT_FOUND_ERROR)
        .send({ message: "Item ID not found" });
    }
    console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    return res
      .status(DEFAULT_ERROR)
      .send({ error: "Could not find user from getCurrentUser controller " });
  }
};

const modifyUserData = async (req, res) => {
  try {
    const updates = { name: req.body.name, avatar: req.body.avatar };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).orFail(() => {
      const error = new Error(
        "User ID not found this is coming from modifyUserData"
      );
      error.statusCode = DOCUMENT_NOT_FOUND_ERROR;
      throw error;
    });

    console.log("updated User from modifyUserData", updatedUser);
    return res.status(200).send(updatedUser);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(error).send({ message: error.message });
    }
    if (error.name === "ValidationError") {
      return res.status(VALIDATION_ERROR).send({
        message: "provided data is incorrect",
      });
    }
    return res
      .status(DEFAULT_ERROR)
      .send({ error: "Could not update user from modifyUserData" });
  }
};

module.exports = {
  createUser,
  signIn,
  getCurrentUser,
  modifyUserData,
};
