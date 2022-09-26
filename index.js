const express = require("express");
const app = express();
const env = require ("dotenv").config()
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
// const URI =
//   "mongodb+srv://Temidayo:Oluwatunmise1@cluster0.oxkgzbw.mongodb.net/virtual_node?retryWrites=true&w=majority";

mongoose.connect(URI, (err) => {
  if (err) {
    console.log("mongoose connection failed");
  } else {
    console.log("mongoose has connected successfully");
  }
});
let userSchema = mongoose.Schema({
  task: String,
});
let userModel = mongoose.model("User.tb", userSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
alltasks = [];
app.get("/", (req, res) => {
  userModel.find((err, result) => {
    if (err) {
      console.log("could not fetch data ");
    } else {
      res.render("index.ejs", { message: "", status: "", alltasks:result});
    }
  })
  //    res.sendFile( __dirname+ "/index.html")
});
app.post("/addtask", (req, res) => {
  let userTask = req.body.task;
  const userDetails = req.body;
  let form = new userModel(userDetails);
        form.save((err) => {
          if (err) {
            console.log("data could not be saved");
            res.render("index.ejs", {message: " not successful",status: false});
          } else {
            console.log("Data saved successfully");
            res.redirect('/');
          }
      })
});
app.get("/dashboard", (req, res) => {
  userModel.find((err, result) => {
    if (err) {
      console.log("could not fetch data ");
    } else {
      console.log(result);
      res.render("Dashboard.ejs", { alltasks: result });
    }
  });
});
app.post("/delete", (req, res) => {
  let userIndex = req.body.id;
  userModel.deleteOne({ _id: userIndex }, (err, result) => {
    if (err) {
      console.log("could not be deleted");
    } else {
      console.log("deleted successfully");
    }
  });
  console.log(req.body);
  res.redirect("/");
});

app.listen(4000, () => {
  console.log("app is listening at port 4000");
});
// userModel.findByIdAndUpdate(id,req.body,(err,result)=>{

// })
