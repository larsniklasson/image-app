const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const ImageMetadata = require("../models/ImageMetadataModel");

const IMG_DIRECTORY_PATH = "public/img";
const RESIZE_WIDTH = 400;
const RESIZE_HEIGHT = 400;

const generateFileName = (name, extension) => {
  name = name.substring(0, 10);
  name = name.toLowerCase();
  name = name
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ /g, "-");

  timestamp = new Date().getTime();

  return `${name}_${timestamp}.${extension}`;
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMG_DIRECTORY_PATH);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, generateFileName(req.body.name, extension));
  },
});

function multerFilter(req, file, cb) {
  const acceptFile = ["image/jpeg", "image/png"].includes(file.mimetype);
  if (!acceptFile) {
    req.filteredOut = true;
  }
  cb(null, acceptFile);
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.getAllImages = async (req, res, next) => {
  const data = await ImageMetadata.find();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

exports.uploadImage = upload.single("photo");

exports.resizeImage = async (req, res, next) => {
  if (!req.filteredOut) {
    const uploadedFilePath = req.file.path;
    const tmpFilePath = `${req.file.destination}/resized_tmp`;

    await sharp(uploadedFilePath)
      .resize(RESIZE_WIDTH, RESIZE_HEIGHT)
      .toFile(tmpFilePath);

    fs.unlinkSync(uploadedFilePath);
    fs.renameSync(tmpFilePath, uploadedFilePath);
  }

  next();
};

exports.createImageMetadata = async (req, res, next) => {
  let doc;
  if (!req.filteredOut) {
    doc = await ImageMetadata.create({
      name: req.body.name,
      path: `/img/${req.file.filename}`,
    });
  }

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
