const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({}).populate('user', {
      username: 1,
      name: 1
    })

  response.json(result.map(x => x.toJSON()))
})



blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

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

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }



  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  console.log(user)

  if (user._id.toString() === blog.user.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'invalid user'
    })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
  response.json(result.toJSON())
})

module.exports =blogRouter
