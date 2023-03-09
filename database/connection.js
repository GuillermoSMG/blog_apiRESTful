const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/my_blog");
    console.log("Succesfully connected to DB my_blog.");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to DB.");
  }
};

module.exports = {
  connection,
};
