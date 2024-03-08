const fs = require("fs");
const colors = require("colors");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/users", (req, res) => {
  let data = fs.readFileSync("./users.json");
  let dataJSON = JSON.parse(data);
  for (let i = 0; i < dataJSON.users.length; i++) {
    if (dataJSON.users[i].userName === req.body.userName)
      throw (
        (res.send("Operation Failed! ".red + "User already in system"),
        console.log("Operation Failed! ".red + "User already in system"))
      );
  }

  dataJSON.users.push(req.body);
  let writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  console.log(dataJSON);
  console.log("Operation Success!".green);
  res.end();
});

app.get("/users", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./users.json")));
});

app.listen(3000, () => console.log("Server is up...".blue));
