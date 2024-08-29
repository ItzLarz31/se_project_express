const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

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
    if (err.name === "ValidationError") {
      next(new BadRequestError("Invalid data"));
    }
    next(err);
  }
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }

  return User.findUserByCredentials(email, password) // Add return here
    .then((user) => {
      // Generate JWT
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.message === "Incorrect password or email") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()

    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("There is no user with the requested id"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
    });
};

const modifyUserData = (req, res, next) => {
  const updates = { name: req.body.name, avatar: req.body.avatar };

  User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((error) => {
      if (error.statusCode === "DocumentNotFoundError") {
        next(new NotFoundError(error.message));
      } else if (error.name === "ValidationError") {
        next(new BadRequestError("Provided data is incorrect"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  signIn,
  getCurrentUser,
  modifyUserData,
};
