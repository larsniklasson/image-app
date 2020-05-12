const express = require("express");
const imageRouter = require("./routes/imageRoutes");

// Create app
const app = express();

// Body parser - middleware that modifies incoming request data into json
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/images", imageRouter);

// Catching uncaught routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
