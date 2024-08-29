const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // Get the user ID from the middleware
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

const getClothingItemById = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Requested resource not found"))
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        next(err);
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Requested resource not found"))
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        next(err);
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Requested resource not found"))
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        next(err);
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
    });
};

const deleteItemById = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Requested resource not found"))
    .then((clothingItem) => {
      if (clothingItem.owner.toString() !== userId.toString()) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(200).send(deletedItem)
      );
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError || err instanceof ForbiddenError) {
        next(err);
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID"));
      } else {
        next(err);
      }
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
