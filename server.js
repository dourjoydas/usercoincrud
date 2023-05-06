const express = require("express")
const app = express()
const mongoose = require("mongoose")
const User = require("./models/userModels")
const cors = require("cors")

//MiddelWare
app.use(
  cors({
    origin:"http://localhost:3000",
  })
);
app.use(express.json())

//sample router
app.get("/",(req,res) => {
  res.send("Hello welcome to my RestApi If you need api got to this link '''https://restapi-lime.vercel.app/products/''' you can Use this api for CRUD opareting Thank You");
})
//sample router 2
/*app.get("/blog",(req,res) => {
  res.send("I am from Blog");
})*/

//Post Data...
app.post("/users", async (req,res) => {
  try{
    const user = await User.create(req.body)
    res.status(200).json(user)
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: "can't post data"})
  }
})

//Get data.....
app.get("/users", async (req,res) => {
  try{
    const users = await User.find({})
    res.status(200).json(users)
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: "can't get data"})
  }
})

//Get data by using id....
app.get("/users/:id", async (req,res) => {
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: "can't get data by using id"})
  }
})


//Put data by using id......
app.put("/users/:id", async (req,res) => {
  try{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if(!user){
      res.status(404).json(`cannot find product in this ${id}`);
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: "can't put data by using id"})
  }
})

//delete data using id......
app.delete("/users/:id", async (req,res) => {
  try{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id, req.body);
    if(!user){
      res.status(404).json(`cannot find product in this ${id}`);
    }
    res.status(200).json(user);
  }catch(error){
    console.log(error.message)
    res.status(500).json({message: "can't delete data by using id"})
  }
})

//connect mongodb....
mongoose.connect("mongodb+srv://alex:Alex12345@users.7jarixk.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  app.listen(5000, (req,res) => {
    console.log("Server Runing at port number 5000");
  })
  console.log("Connected MongoDB")
}).catch(() => {
  console.log("Database don't connect")
})
