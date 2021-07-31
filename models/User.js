const mongoose = require("mongoose");
module.exports = User = mongoose.model("User", {
  username: String,
  password: String,
});
