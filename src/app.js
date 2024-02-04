const express = require("express");
const router = require("./routes/index");
const cors = require("cors");

//Configuramos express
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;
