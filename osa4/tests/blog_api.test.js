const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }
  await api.post('/api/blogs').send(blog)
})



test('all blogs have valid id field', async() => {
  const res = await api.get('/api/blogs')
    expect(res.body[0].id.toBeDefined)

})

test('posting a blog is ok', async() => {
  const allBlogs = await api.get('/api/blogs')

  const newPost = {
    title: "React patterns",
    author: "Michael ban",
    url: "https://reactpatterns.com/",
    likes: 3
  }

  await api.post('/api/blogs').send(newPost)
  const newAmountOfBlogs = await api.get('/api/blogs')
  const numberOfBlogs = newAmountOfBlogs.body.length

  expect(newAmountOfBlogs.body).toHaveLength(allBlogs.body.length + 1)
  expect(newAmountOfBlogs.body[numberOfBlogs-1]).toHaveProperty('title', 'author', 'url', 'likes')
})

afterAll(() => {
  mongoose.connection.close()
})
