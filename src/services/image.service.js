const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;
const Image = require("../models/image.model");
const Transformation = require("../models/transformation.model");
const { applyTransformations } = require("../utils/image-transformer");

class ImageService {
  static async uploadImage(userId, file) {
    const uploadDir = path.join(__dirname, "../../uploads/original");
    await fs.mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, file.buffer);

    const image = await Image.create({
      userId,
      filename,
      originalPath: filepath,
      mimeType: file.mimetype,
      size: file.size,
    });

    return {
      id: image._id,
      filename: image.filename,
      size: image.size,
      mimeType: image.mimeType,
    };
  }

  static async transformImage(imageId, transformations, userId) {
    const image = await Image.findOne({ _id: imageId, userId });
    if (!image) {
      const error = new Error("Image not found");
      error.statusCode = 404;
      throw error;
    }

    const transformDir = path.join(__dirname, "../../uploads/transformed");
    await fs.mkdir(transformDir, { recursive: true });

    const transformedFilename = `${Date.now()}-transformed-${image.filename}`;
    const transformedPath = path.join(transformDir, transformedFilename);

    await applyTransformations(
      image.originalPath,
      transformedPath,
      transformations
    );

    const transformation = await Transformation.create({
      imageId: image._id,
      transformedPath,
      parameters: transformations,
    });

    return {
      id: transformation._id,
      path: transformedPath,
    };
  }

  static async getImage(imageId, userId) {
    const image = await Image.findOne({ _id: imageId, userId });
    if (!image) {
      const error = new Error("Image not found");
      error.statusCode = 404;
      throw error;
    }

    return {
      path: image.originalPath,
      mimeType: image.mimeType,
    };
  }

  static async listImages(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const images = await Image.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return images.map((image) => ({
      id: image._id,
      filename: image.filename,
      size: image.size,
      mimeType: image.mimeType,
      createdAt: image.createdAt,
    }));
    
  }
}

module.exports = ImageService;
