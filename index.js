// importing libs
const express = require('express')
const app = express()
const fs = require('fs')
const bp = require('body-parser')
const expHbr = require('express-handlebars')

// custom
const public = `${__dirname}/public`
const file = f =>  `${public}/${f}`
const User = require('./helpers/user')

// configuring server
app.use(express.static(public))
app.engine('handlebars', expHbr({defaultLayout: file('main')}))
app.set('view engine', 'handlebars')
app.use(bp.json())

// routes
app.all('/', (req,res) => {
  res.render(file('home'), {
    title: 'Divar Home'
  })
})

app.post('/api/user', (req, res) => {
  let {name,email,password} = req.body
  let user = new User(name, email, password)
  user.save()
  res.send("success: user has been saved!")
})

// starting server
app.listen(3000, err => {
  if (err) return err
  console.log("Server is Running on port 3000")
})