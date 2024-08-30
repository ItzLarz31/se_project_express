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

router.get("/", (req, res, next) => {
  getClothingItems(req, res, next);
});

router.get("/:itemId", (req, res, next) => {
  getClothingItemById(req, res, next);
});

router.post("/", auth, validateCardBody, createClothingItem);

router.put("/:itemId/likes", auth, validateId, (req, res, next) => {
  likeItem(req, res, next);
});

router.delete("/:itemId/likes", auth, validateId, (req, res, next) => {
  dislikeItem(req, res, next);
});

router.delete("/:itemId", auth, validateId, (req, res, next) => {
  deleteItemById(req, res, next);
});

module.exports = router;
