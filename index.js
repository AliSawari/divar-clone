// importing libs
const express = require('express')
const app = express()
const bp = require('body-parser')
const expHbr = require('express-handlebars')

// custom
const public = `${__dirname}/public`
const file = f =>  `${public}/${f}`
const {loadData, saveData, findOne} = require('./helpers/io')
const Post = require('./helpers/post')

// configuring server
app.use(express.static(public))
app.engine('handlebars', expHbr({defaultLayout: file('main')}))
app.set('view engine', 'handlebars')
app.use(bp.urlencoded({extended:true}))


app.get('/', (req,res) => {
  let data = loadData()
  res.render(file('home'), {
    title: 'Home', data
  })
})

app.get('/product/:id', (req,res) => {
  let {id} = req.params
  let p = findOne(id)
  if(p){
    res.render(file('product'), {
      product: p
    })
  } else {
    res.status(404).render(file('error'), {title:'page not found'})
  }
})

app.get('/new', (req,res) => res.render(file('new'), {title:"new post"}))

app.post('/newpost', (req,res) => {
  let all = loadData()
  let {productName,manuName,price,description} = req.body
  let p = new Post(`${manuName} - ${productName}`, price, description)
  all.posts.push(p)
  saveData(all)
  res.redirect('/')
})

// starting server
app.listen(3000, err => {
  if (err) return err
  console.log("Server is Running on port 3000")
})