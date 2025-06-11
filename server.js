const express = require("express");
const app = express();
const PORT = 3000;

require("dotenv").config();
const apiKey = process.env.BIBLE_API_KEY;

app.use(express.json());
app.use(express.static("public"));