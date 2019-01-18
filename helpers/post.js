class Post {
  constructor(title,disc,pics){
    this.id = Math.floor((Math.random() * 1000) / 3.1415) 
    this.title = title
    this.disc = disc,
    this.pics = pics
  }
}

module.exports = Post
