const express = require("express");
const bParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, (req, res) => 
{
  console.log("Hello");
});

app.get("/", (req, res) => 
{
  var today = new Date().getDay();
  var day = "";
  switch (today) 
  {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error");
      break;
  }
      res.render("list", { crnDay: day });
});
