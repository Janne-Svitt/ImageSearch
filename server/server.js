const fs = require("fs");
const colors = require("colors");

const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.end();
});

app.listen(3000, () => console.log("Server is up...".blue));
