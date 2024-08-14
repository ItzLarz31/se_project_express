const ClothingItem = require("../models/clothingItem");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  CAST_ERROR,
  VALIDATION_ERROR,
  DEFAULT_ERROR,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // Get the user ID from the middleware
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(VALIDATION_ERROR).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getClothingItemById = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
      res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(CAST_ERROR).send({ message: "Invalid id" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      return res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(CAST_ERROR).send({ message: "Invalid id" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      return res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(CAST_ERROR).send({ message: "Invalid id" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const deleteItemById = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((clothingItem) => {
      if (!clothingItem) {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      return res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(CAST_ERROR).send({ message: "Invalid id" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  getClothingItemById,
  likeItem,
  dislikeItem,
  deleteItemById,
};
