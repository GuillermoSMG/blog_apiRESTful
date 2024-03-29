const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "role_user",
  },
  image: {
    type: String,
    default: "default.png",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
