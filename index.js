const express = require('express')
const app = express()
const fs = require('fs')
const bp = require('body-parser')

const User = require('./helpers/user')

app.use(bp.json())

app.all('/', (req,res) => {
  res.send("Welcome to Divar Clone ")
})

app.post('/api/user', (req, res) => {
  let {name,email,password} = req.body
  let user = new User(name, email, password)
  user.save()
  res.send("success: user has been saved!")
})

app.listen(3000, err => {
  if (err) return err
  console.log("Server is Running on port 3000")
})