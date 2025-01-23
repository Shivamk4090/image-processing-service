const ImageService = require("../services/image.service");
const { validationResult } = require("express-validator");

class ImageController {
  static async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const result = await ImageService.uploadImage(req.user.id, req.file);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async transform(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { transformations } = req.body;
      const result = await ImageService.transformImage(
        id,
        transformations,
        req.user.id
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async retrieve(req, res, next) {
    try {
      const { id } = req.params;
      const image = await ImageService.getImage(id, req.user.id);
      res.sendFile(image.path);
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const images = await ImageService.listImages(req.user.id, page, limit);
      res.json(images);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
