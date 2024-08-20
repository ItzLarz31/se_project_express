const express = require("express");
const mongoose = require("mongoose");

const app = express();
const indexRouter = require("./routes/index");

const cors = require("cors");

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
app.use("/", indexRouter);
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
