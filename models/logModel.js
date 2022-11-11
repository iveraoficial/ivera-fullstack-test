const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  method: String,
  url: String,
  params: String,
  Date: {
    type: Date,
    default: () => Date.now() - 3 * 60 * 60 * 1000,
  },
});

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;
