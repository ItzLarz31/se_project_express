const router = require("express").Router();
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

router.post("/", createClothingItem);

router.put("/:itemId/likes", (req, res) => {
  likeItem(req, res);
});

router.delete("/:itemId/likes", (req, res) => {
  dislikeItem(req, res);
});

router.delete("/:itemId", (req, res) => {
  deleteItemById(req, res);
});

module.exports = router;
