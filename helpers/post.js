class Post {
  constructor(title,price,desc,pic=null){
    this.id = Math.floor((Math.random() * 1000) / 3.1415) 
    this.title = title
    this.price = price
    this.desc = desc
    this.pic = pic
  }
}

module.exports = Post
