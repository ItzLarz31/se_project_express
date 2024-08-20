const router = require("express").Router();
const { DOCUMENT_NOT_FOUND_ERROR } = require("../utils/errors");

const userRouter = require("./users");
const itemRouter = require("./clothingitems");
const { auth } = require("../middlewares/auth");
const { signIn, createUser } = require("../controllers/users");

router.use("/users", auth, userRouter);
router.use("/items", itemRouter);
router.post("/signup", createUser);
router.post("/signin", signIn);

router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
