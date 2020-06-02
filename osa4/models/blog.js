const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (doc, retDoc) => {
    retDoc.id = doc._id.toString()
    delete retDoc._id
    delete retDoc.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
