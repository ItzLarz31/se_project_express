const router = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/users");

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.get("/:userId", (req, res) => {
  getUserById(req, res);
});

router.post("/", createUser);

module.exports = router;
