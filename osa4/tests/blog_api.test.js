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

test('valid amount of blogs', async() => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})
