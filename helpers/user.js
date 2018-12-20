const {saveData,loadData} = require('./io')
const {createHmac} = require('crypto')

var allData = loadData()

function encrypt(data){
  return createHmac('sha256', data).digest('hex')
}

class User {
  constructor(name,email,password){
    this.name = name
    this.email = this.emailCheck(email)
    this.password = this.genPassowrd(password)
    this.createdAt = new Date().toLocaleString()
    this.posts = []
  }

  emailCheck(em){
    let p = em.toLowerCase()
    if(p.includes('@')){
      let q = p.match(/(mail)|(.com)/g)
      if(q.length > 0){
        return p
      } else {
        throw new Error("No Email Provided!!")
      }
    } else {
      throw new Error("No Email Provided!!")
    }
  }

  genPassowrd(pass){
    let Npass = pass.toString()
    if(Npass.length > 6){
      return encrypt(Npass)
    } else {
      throw new Error('password must be more that 6 chararcters')
    }
  }


  info(){
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      posts: this.posts
    }
  }


  save(){
    let me = this.info()
    allData.users.push(me)
    saveData(allData)
  }

}

module.exports = User