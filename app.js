//Node Modules
const express = require("express");
const bodyParser = require("body-parser");
const dateMod = require(__dirname+"/date.js"); //custom module
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.listen(3000, (req, res) => 
{
  console.log("Server Started");
});

//declaring arrays
const items = ["Buy Food","Eat Food","Drink!!!"]
const workItems = ["Playing Football"];


//Homepage(/) Appearance
app.get("/", (req, res) => 
{
  //Export from Custom Module
   const day = dateMod.getDate()

  //rendering from views (EJS files)
  res.render("list", { list_page: day, item: items }); 
  //format({keyword: value})
});


//work page(Template)
app.get("/work", (req,res) => 
{
  res.render("list", { list_page: "Work-List", item: workItems });
})


//about page(Template)
app.get("/about", (req,res) => 
{
 res.render("about");
})


//For Any kind of Send/Post 
app.post("/", (req,res) => 
{
  // body-parsing
  let newItem = req.body.nItem;  

  if (newItem !== "") 
  {
    //list=name of button(Form) & value==="Work-List")
    if (req.body.list === "Work-List")
    {
      workItems.push(newItem);
      res.redirect("/work");
    } 
    else 
    {
      items.push(newItem);
      res.redirect("/");
    }
  }
}) 




