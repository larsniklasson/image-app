const multer = require("multer");
const ImageMetadata = require("../models/ImageMetadataModel");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${req.body.name}.${extension}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.getAllImages = async (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      data: "getAllImages",
    },
  });
};

exports.uploadImage = upload.single("photo");

exports.createImageMetadata = async (req, res, next) => {
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
