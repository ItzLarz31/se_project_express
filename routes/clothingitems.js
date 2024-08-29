const router = require("express").Router();

const { auth } = require("../middlewares/auth");

const { validateCardBody, validateId } = require("../middlewares/validation");

const {
  getClothingItems,
  createClothingItem,
  getClothingItemById,
  likeItem,
  dislikeItem,
  deleteItemById,
} = require("../controllers/clothingItems");

router.get("/", (req, res) => {
  getClothingItems(req, res);
});

router.get("/:itemId", (req, res) => {
  getClothingItemById(req, res);
});

router.post("/", auth, validateCardBody, createClothingItem);

router.put("/:itemId/likes", auth, validateId, (req, res) => {
  likeItem(req, res);
});

router.delete("/:itemId/likes", auth, validateId, (req, res) => {
  dislikeItem(req, res);
});

router.delete("/:itemId", auth, validateId, (req, res) => {
  deleteItemById(req, res);
});

module.exports = router;
