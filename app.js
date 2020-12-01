require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.static("public"));

const url = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.get("/api", (req, res) => {
  fetch(url)
    .then((res) => res.json())
    .then((t) => {
      res.json(t);
    })
    .catch(() => res.sendStatus(500));
});

app.listen(3000, () => {
  console.log("Running at 3000.");
});
