const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('', async (request, response) => {
  const result = await Blog.find({})
  response.json(result.map(x => x.toJSON()))
})



blogRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)
  
  const result = await blog.save()

  response.json(result.toJSON())

})

module.exports = blogRouter
