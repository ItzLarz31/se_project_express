const router = require("express").Router();
const { NotFoundError } = require("../errors/NotFoundError");
const { validateUser, validateLogin } = require("../middlewares/validation");

const userRouter = require("./users");
const itemRouter = require("./clothingitems");
const { auth } = require("../middlewares/auth");
const { signIn, createUser } = require("../controllers/users");

router.use("/users", auth, userRouter);
router.use("/items", itemRouter);
router.post("/signup", validateUser, createUser);
router.post("/signin", validateLogin, signIn);

router.use((req, res) => {
  res;
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
