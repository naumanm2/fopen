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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(result.toJSON())
})

module.exports = blogRouter
