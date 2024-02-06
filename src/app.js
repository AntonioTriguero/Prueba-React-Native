const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const path = require("path");
//Configuramos express
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

const staticDirectory = path.join(__dirname, "../public");
app.use(express.static(staticDirectory));

app.use(router);

module.exports = app;
