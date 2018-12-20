class Post {
  constructor(title,disc,pics){
    this.id = (Math.random() * 100) / (Math.random() * 10)
    this.title = title
    this.disc = disc,
    this.pics = pics
  }
}

module.exports = Post
