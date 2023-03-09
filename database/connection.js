const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("Succesfully connected to DB my_blog.");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to DB.");
  }
};

module.exports = {
  connection,
};
