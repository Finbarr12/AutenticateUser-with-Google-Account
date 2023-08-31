const mongoose = require("mongoose");

const URI =
  "mongodb+srv://FinbarrDB:codelab06@cluster0.2xzneqt.mongodb.net/check?retryWrites=true&w=majority";
const dbConnect = mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = dbConnect;
