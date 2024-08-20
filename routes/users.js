const router = require("express").Router();
const { getCurrentUser, modifyUserData } = require("../controllers/users");

router.get("/me", (req, res) => {
  getCurrentUser(req, res);
});

router.patch("/me", (req, res) => {
  modifyUserData(req, res);
});

module.exports = router;
