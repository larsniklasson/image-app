const mongoose = require("mongoose");

const imageMetadataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  { collection: "imageMetadata" }
);

const ImageMetadata = mongoose.model("ImageMetadata", imageMetadataSchema);

module.exports = ImageMetadata;
