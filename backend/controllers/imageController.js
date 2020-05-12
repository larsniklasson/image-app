const ImageMetadata = require("../models/ImageMetadataModel");

exports.getAllImages = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      data: "getAllImages",
    },
  });
};

exports.uploadImage = async (req, res, next) => {
  const doc = await ImageMetadata.create(req.body);

  if (!doc) {
    return res.status(400).json({
      status: "fail",
      message: "invalid input",
    });
  }

  return res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
};
