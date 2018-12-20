const fs = require('fs')
const DB = __dirname + '/../db/index.json'

function saveData(data){
  let d = JSON.stringify(data,null,2)
  fs.writeFile(DB, d, (err) => {
    if(err) throw err
    console.log("success: data has been saved")
  })
}

function loadData(){
  try {
    let d = fs.readFileSync(DB).toString()
    let a = JSON.parse(d)
    return a
  } catch(e){
    console.log(e)
  }
}

module.exports = {saveData, loadData}