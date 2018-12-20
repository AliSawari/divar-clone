const {createHmac} = require('crypto')

function encrypt(data){
  return createHmac('sha256', data).digest('hex')
}

module.exports = encrypt