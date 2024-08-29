const router = require("express").Router();
const { getCurrentUser, modifyUserData } = require("../controllers/users");

const { ValidationUpdateUser } = require("../middlewares/validation");

router.get("/me", (req, res) => {
  getCurrentUser(req, res);
});

router.patch("/me", ValidationUpdateUser, (req, res) => {
  modifyUserData(req, res);
});

module.exports = router;
