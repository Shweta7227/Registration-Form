console.log("Backend file loaded");
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/registeration")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err))

//API:To submit the user details to db 
  //API
app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})