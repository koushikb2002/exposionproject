const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Events", EventSchema);
