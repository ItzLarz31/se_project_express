const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRouter = require("./routes/index");

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "66bcad8bb8de38ca8e3bde3a", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
