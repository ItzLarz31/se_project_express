const router = require("express").Router();

const { auth } = require("../middlewares/auth");

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

router.post("/", auth, createClothingItem);

router.put("/:itemId/likes", auth, (req, res) => {
  likeItem(req, res);
});

router.delete("/:itemId/likes", auth, (req, res) => {
  dislikeItem(req, res);
});

router.delete("/:itemId", auth, (req, res) => {
  deleteItemById(req, res);
});

module.exports = router;
