const fs = require("fs");
const colors = require("colors");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ----

app.post("/users", (req, res) => {
  let data = fs.readFileSync("./users.json");
  let dataJSON = JSON.parse(data);
  for (let i = 0; i < dataJSON.users.length; i++) {
    if (dataJSON.users[i].userMail === req.body.userMail)
      return console.log("User find! Operation Success!".green);
    res.end();
  }

  dataJSON.users.push(req.body);
  let writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  console.log("User was not find. Create new user. Operation Success!".green);
  res.end();
});

// ----

app.post("/usersAddFav", (req, res) => {
  let data = fs.readFileSync("./users.json");
  let dataJSON = JSON.parse(data);
  let userData = req.body.userMail;
  let userFavImgData = dataJSON.users.find(
    (user) => user.userMail === userData
  ).favImg;
  for (let i = 0; i < userFavImgData.length; i++) {
    if (userFavImgData[i].link === req.body.favImg.link) {
      throw res.send("Already Liked");
    }
  }

  userFavImgData.push(req.body.favImg);
  console.log(
    `
  Img Added 
  `.green
  );
  let writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  res.end();
});

// ----

app.get("/usersFavImg", (req, res) => {
  let data = fs.readFileSync("./users.json");
  let dataJSON = JSON.parse(data);
  let userData = req.params.userMail;

  res.send(dataJSON);
  res.end();
});

// ----

app.get("/users", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./users.json")));
});

app.listen(3000, () => console.log("Server is up...".blue));
