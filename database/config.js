const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB__CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al incializar la base de datos");
  }
};

module.exports = dbConnection;
