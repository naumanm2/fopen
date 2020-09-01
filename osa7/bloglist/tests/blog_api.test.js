const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const User = require('../models/blog')

const api = supertest(app)

const token = jwt.sign({
    username: "taipei",
    id: "5ed9fbd5f5a018686ee255ee"
  }, process.env.SECRET)


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })



test('all blogs have valid id field', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id.toBeDefined)

})

test('posting a blog is ok', async () => {
  const allBlogs = await helper.blogsInDb()
  const newPost = {
    title: "React patterns",
    author: "Michael ban",
    url: "https://reactpatterns.com/",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newPost)
  const numberOfBlogs = await helper.blogsInDb()

  expect(numberOfBlogs).toHaveLength(allBlogs.length + 1)
  expect(numberOfBlogs[numberOfBlogs.length - 1]).toHaveProperty('title', 'author', 'url', 'likes')
})

test('like has default value of 0', async () => {
  const blog = new Blog({
    title: "my blogs",
    author: "Max",
    url: "https://reactpatterns.com/"
  })


  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
  expect(blog.likes).toBe(0)
})

test('blog has valid fields for url and title', async () => {
  const blog = new Blog({
    author: "Max"
  })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(blog)
    .expect(400)
})

test("won't let user add a blog without valid token", async () => {
  const blog = new Blog({
    title: "React matters",
    author: "Max fox",
    url: "https://beactpatterns.com/",
    likes: 32
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(401)
})
})


afterAll(() => {
  mongoose.connection.close()
})
