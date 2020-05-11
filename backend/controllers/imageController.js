exports.getAllImages = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      data: "getAllImages",
    },
  });
};

exports.uploadImage = async (req, res, next) => {
  res.status(201).json({
    status: "success",
    data: {
      data: "uploadImage",
    },
  });
};
