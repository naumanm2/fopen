const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
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
