const sharp = require('sharp');

async function applyTransformations(inputPath, outputPath, transformations) {
  let transformer = sharp(inputPath);

  if (transformations.resize) {
    transformer = transformer.resize(
      transformations.resize.width,
      transformations.resize.height
    );
  }

  if (transformations.crop) {
    transformer = transformer.extract({
      left: transformations.crop.x,
      top: transformations.crop.y,
      width: transformations.crop.width,
      height: transformations.crop.height
    });
  }

  if (transformations.rotate) {
    transformer = transformer.rotate(transformations.rotate);
  }

  if (transformations.filters) {
    if (transformations.filters.grayscale) {
      transformer = transformer.grayscale();
    }
    if (transformations.filters.sepia) {
      transformer = transformer.sepia();
    }
  }

  if (transformations.format) {
    transformer = transformer.toFormat(transformations.format);
  }

  

  await transformer.toFile(outputPath);
}

module.exports = {
  applyTransformations
};