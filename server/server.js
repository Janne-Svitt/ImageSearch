const fs = require("fs");
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const {
  schema,
  schemaRemoveFav,
  schemaAddFav,
} = require("../server/validation/userValidation");
const Joi = require("joi");

const app = express();
app.use(express.json());
app.use(cors());

// --------------------------------------------------------
// --------------------------------------------------------

// Check if user are in system, if not creating new
app.post("/users", (req, res) => {
  // Validate with Joi
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  // Read file
  const data = fs.readFileSync("./users.json");
  const dataJSON = JSON.parse(data);

  // Check if user already in file
  for (let i = 0; i < dataJSON.users.length; i++) {
    if (dataJSON.users[i].userMail === req.body.userMail)
      return console.log(
        `
--> User find! 
--> ${"Operation Success!".green}
    `
      );
    res.end();
  }

  // If user is not in file, create user
  dataJSON.users.push(req.body);
  const writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  console.log(
    `
--> User Was Not Find. 
--> Creating New User. 
--> ${"Operation Success!".green}
    `
  );
  res.end();
});

// --------------------------------------------------------
// --------------------------------------------------------

// Add img to user favimg
app.post("/usersAddFav", (req, res) => {
  // Validate with Joi
  const { error } = schemaAddFav.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const data = fs.readFileSync("./users.json");
  const dataJSON = JSON.parse(data);
  const userData = req.body.userMail;
  let userFavImgData = dataJSON.users.find(
    (user) => user.userMail === userData
  ).favImg;

  // Push in chosen img
  userFavImgData.push(req.body.favImg);
  console.log(
    `
--> Img ${"Added".green} 
`
  );
  const writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  res.end();
});

// --------------------------------------------------------
// --------------------------------------------------------

// Removes Img from user
app.delete("/usersRemoveFav", (req, res) => {
  // Validate with Joi
  const { error } = schemaRemoveFav.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  // Read file
  const data = fs.readFileSync("./users.json");
  const dataJSON = JSON.parse(data);
  const userData = req.body;

  // Find only the array with favImg for the specific user
  let userFavImgData = dataJSON.users.find(
    (user) => user.userMail === userData.userMail
  );

  // Filter out everything that is not true with Img we want to remove
  const userFavImgDataFilter = userFavImgData.favImg.filter(
    (favImg) => favImg.link !== userData.favImg.link
  );

  console.log(
    `
--> Img ${"Removed".red}
  `
  );

  // Overwrite the old favImg array with new array
  userFavImgData.favImg = userFavImgDataFilter;

  // Write back to file
  const writeData = JSON.stringify(dataJSON);
  fs.writeFileSync("./users.json", writeData);
  res.status(200).json(userFavImgData);
});

// --------------------------------------------------------
// --------------------------------------------------------

app.get("/usersFavImg", (req, res) => {
  let data = fs.readFileSync("./users.json");
  let dataJSON = JSON.parse(data);
  res.send(dataJSON);
  res.end();
});

// --------------------------------------------------------
// --------------------------------------------------------

// Read file and send it to page
app.get("/users", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("./users.json")));
});

app.listen(3000, () => console.log("Server is up...".blue));
