console.log("Backend file loaded");
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const app = express()
app.use(cors())
app.use(express.json())


    //MongoDb connectivity
    mongoose.connect("mongodb://127.0.0.1:27017/registeration")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err))


    //API update the details
    app.put('/updateUser/:id', (req, res) => {
        const id = req.params.id;
        UserModel.findByIdAndUpdate({_id: id}, {
            firstName: req.body.firstName, middleName: req.body.middleName, 
            lastName: req.body.lastName, countryCode: req.body.countryCode, 
            mobile: req.body.mobile, gender: req.body.gender,
            email: req.body.email, dob: req.body.dob, age: req.body.age, 
            pStreet: req.body.pStreet, pCity: req.body.pCity, pState: req.body.pState, 
            pPinCode: req.body.pPinCode,password: req.body.password, 
            terms: req.body.terms
         } )
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })
//API to get all data of particular user
   app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
 })

//API to get the data on user page
  app.get("/users", (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    })

    //for deletion od record
app.delete('/deleteUser/:id', (req, res) =>{
    const id= req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(users => res.json(res))
    .catch(err => res.json(err))
})


//API:To submit the user details to db 
app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})