require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(express.static("client/build"));

const url = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.get("/api", (req, res) => {
  fetch(url)
    .then((res) => res.json())
    .then((t) => {
      res.json(t);
    })
    .catch(() => res.sendStatus(500));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API running at 3000.");
});
