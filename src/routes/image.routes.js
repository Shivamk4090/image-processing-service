const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");
const ImageController = require("../controllers/image.controller");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const router = express.Router();

router.post("/upload", upload.single("image"), ImageController.upload);

router.post(
  "/:id/transform",
  [
    body("transformations").isObject(),
    body("transformations.resize.width").optional().isInt({ min: 1 }),
    body("transformations.resize.height").optional().isInt({ min: 1 }),
    body("transformations.crop.width").optional().isInt({ min: 1 }),
    body("transformations.crop.height").optional().isInt({ min: 1 }),
    body("transformations.crop.x").optional().isInt({ min: 0 }),
    body("transformations.crop.y").optional().isInt({ min: 0 }),
    body("transformations.rotate").optional().isFloat(),
    body("transformations.format").optional().isIn(["jpeg", "png", "webp"]),
    body("transformations.filters.grayscale").optional().isBoolean(),
    body("transformations.filters.sepia").optional().isBoolean(),
  ],
  ImageController.transform
);

router.get("/:id", ImageController.retrieve);

router.get("/", ImageController.list);

module.exports = router;
