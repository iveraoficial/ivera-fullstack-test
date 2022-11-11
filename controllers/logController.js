const Log = require("../models/logModel");
const catchAsync = require("../utils/catchAsync");

exports.createLog = catchAsync(async (req, res, next) => {
  try {
    const newLog = await Log.create({
      method: req.method,
      url: req.originalUrl,
      date: Date.now() - 3 * 60 * 60 * 1000,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
  next();
});

exports.getAll = catchAsync(async (req, res, next) => {
  try {
    const logs = await Log.find();

    res.status(200).json({
      status: "success",
      data: {
        logs,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
