const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(result.map(x => x.toJSON()))
})



blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })

  const result = await blog.save()
  
  user.blogs = user.blogs.concat(result._id)
  await user.save()

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
