// importing libs
const express = require('express')
const app = express()
const fs = require('fs')
const bp = require('body-parser')
const expHbr = require('express-handlebars')

// custom
const public = `${__dirname}/public`
const file = f =>  `${public}/${f}`
const {loadData, saveData} = require('./helpers/io')
const Post = require('./helpers/post')

// configuring server
app.use(express.static(public))
app.engine('handlebars', expHbr({defaultLayout: file('main')}))
app.set('view engine', 'handlebars')
app.use(bp.json())

// routes
app.all('/', (req,res) => {
  let all = loadData()
  res.render(file('home'), {
    title: 'Divar Home',
    data: all
  })
})

app.get('/product/:id', (req, res) => {
  let {id} = req.params
  let all = loadData()
  res.render(file('product'), {
    title: id
  })
})

app.get('/new', (req, res) => {
  res.render(file('new'), {
    title: "New Post"
  })
})

app.post('/newPost', (req, res) => {
  let all = loadData()
  let {title, disc, pics} = req.body
  let p = new Post(title, disc, pics)
  all.posts.push(p)
  saveData(all)
  setTimeout(() => {
    res.redirect('/')
  }, 500)
})


// starting server
app.listen(3000, err => {
  if (err) return err
  console.log("Server is Running on port 3000")
})