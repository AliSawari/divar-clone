const {loadData} = require('./io')
const encrypt = require('./encrypt')

const allData = loadData()

function login(cred){
  let hashed = encrypt(cred.password)
  for(let x in allData.users){
    if(cred.email === x.email){
      if(hashed === x.password){
        return {
          access: true,
          user: x
        }
      } else {
        return {
          access: false,
          msg: 'wrong password'
        }
      }
    } else {
      return {
        access: false,
        msg: 'No one with this email'
      }
    }
  }
}

module.exports = login