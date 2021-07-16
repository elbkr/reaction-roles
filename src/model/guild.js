const mongoose = require("mongoose");

/**
 * TODO: Find the best way to store guild groups and reaction roles
 */

const guild = new mongoose.Schema(
  {
    _id: String,
    prefix: String,

    groups: Array,
    reactroles: Array,
  },
  { versionKey: false }
);

module.exports = mongoose.model("guild", guild);
