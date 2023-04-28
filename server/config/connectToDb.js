//load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
