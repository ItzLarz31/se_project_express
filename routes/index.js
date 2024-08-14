const router = require("express").Router();
const { DOCUMENT_NOT_FOUND_ERROR } = require("../utils/errors");

const userRouter = require("./users");
const itemRouter = require("./clothingitems");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.use((req, res) => {
  res
    .status(DOCUMENT_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
