const DB = `${__dirname}/../db/index.json`
const fs = require('fs')

function loadData(){
  let d = fs.readFileSync(DB).toString()
  return JSON.parse(d)
}

function saveData(data){
  let d = JSON.stringify(data,null,2)
  fs.writeFileSync(DB, d)
}

function findOne(id){
  let data = loadData()

  for(let p in data.posts){
    if(data.posts[p].id == id){
      return data.posts[p]
    }
  }
}

module.exports = {
  loadData, saveData, findOne
}