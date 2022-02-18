const mongoose = require("mongoose");
//connecting with database
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/placement-cell")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting to mongodb"));

db.once("open", function () {
  console.log("Connected To MongoDB");
});

module.exports = db;
