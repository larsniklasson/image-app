const multer = require("multer");
const ImageMetadata = require("../models/ImageMetadataModel");

const IMG_DIRECTORY_PATH = "public/img";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMG_DIRECTORY_PATH);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${req.body.name}.${extension}`);
  },
});

function multerFilter (req, file, cb) {
  const acceptFile = ["image/jpeg", "image/png"].includes(file.mimetype)
  if(!acceptFile){
    req.filteredOut = true;
  }
  cb(null, acceptFile)
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.getAllImages = async (req, res, next) => {
  const data = await ImageMetadata.find();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

exports.uploadImage = upload.single("photo");

exports.createImageMetadata = async (req, res, next) => {
  
  let doc;
  if(!req.filteredOut){
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
