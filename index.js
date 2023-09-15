const express = require("express");
const mongoose = require("mongoose");
const router=require("./routes/userRoutes")
require("dotenv").config();

const app = express();
app.use(express.json());
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

  app.use("/api",router)

const port = process.env.PORT;

app.listen(port, () => console.log(`server is listening on port ${port}...`));
