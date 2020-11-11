/****************Node Modules***********************/
const express = require("express");
const bodyParser = require("body-parser");
const mango = require("mongoose");
var _ = require("lodash");
const { update } = require("lodash");
const dateMod = require(__dirname+"/date.js"); //custom module

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.listen(3000, (req, res) => 
{
  console.log("Server Started");
});



/****************Create DataBase(S)*******************/
mango.connect("mongodb+srv://admin-waleee:godofwar3@clusterwaleee.steez.mongodb.net/Test?retryWrites=true&w=majority/List",{ useNewUrlParser: true }, { useUnifiedTopology: true });

//Create 2 Schemas
const ItemSchema = 
{
  name: String
}

const ListSchema =
{
  name: String,
  items: [ItemSchema]
}

//Create 2 Models
const item = mango.model("Item", ItemSchema); 
const list = mango.model("List", ListSchema); 

//Now Create Instances from Model
const item1 = new item({ name: "Playing FootBall"});
const item2 = new item({ name: "Playing Cricket"});
const item3 = new item({ name: "Eating Burger"});

const defItem = [item1,item2,item3]; //Collect all inside an Array




/********************HomePage************************/
app.get("/", (req, res) => 
{
  const day = dateMod.getDate();

  item.find({}, (err,foundItem) => 
  {
      if (foundItem.length === 0) 
      {
        item.insertMany(defItem);
        res.redirect("/");  
      }
      else
      {
        res.render("list", { heading: "Home", item: foundItem , time: day});  
      }
 });
});



/****************Custom_Page*******************/
app.get("/:customDir", (req, res) => 
{
  const day = dateMod.getDate();
  
  const dir = _.capitalize(req.params.customDir);

  list.findOne({name: dir}, (err, foundList) => 
  {
    if (!err) 
    {
      if (!foundList) 
      {
        //then create new list
        const list_x = new list
        ({
          name: dir,
          items: defItem,
        });
        list_x.save();
        res.redirect(`/${list_x.name}`);
      } 
      else 
      {
        res.render("list", { heading: foundList.name, item: foundList.items, time: day});
      }
    }
  })
})



/**************Submit_Post******************/
app.post("/", (req, res) => 
{
  // body-parsing
  let form_item = req.body.n_Item;
  let form_list = req.body.list;

  const item_x = new item    //like item1/2/3
  ({
    name: form_item
  });

  if(form_list === "Home")
  {
    item_x.save();
    res.redirect("/");
  }
  else
  {
    list.findOne({name: form_list}, (err, foundList) => 
    {
     foundList.items.push(item_x);
     foundList.save();
     res.redirect(`/${form_list}`);
    }) 
  }
}); 



/***************Delete_Post**************/
app.post("/delete", (req,res) => 
{
  const id_num = req.body.single_item;
  const hidden = req.body.hiddenList;
  
  if (hidden === "Home") 
  {
    item.findByIdAndRemove(id_num, (err) => 
    {
      if (!err) 
      {
        console.log("Success!");
      }
      res.redirect("/");
    });
  } 
  else 
  {
    list.findOneAndUpdate({name: hidden }, {$pull: {items: {_id: id_num }}}, (err, foundList) => 
    {
        if (!err) 
        {
          console.log("Success!");
        }
        res.redirect(`/${hidden}`);
    });
  }
});




