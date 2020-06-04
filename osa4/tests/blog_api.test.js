const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    userId: "5ed8a5286b371e5f90f9bfb7"
  }

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})



test('all blogs have valid id field', async() => {
  const res = await api.get('/api/blogs')
    expect(res.body[0].id.toBeDefined)

})

test('posting a blog is ok', async() => {
  const allBlogs = await helper.blogsInDb()
  await Blog.deleteMany({})

  const newPost = {
    title: "React patterns",
    author: "Michael ban",
    url: "https://reactpatterns.com/",
    likes: 3,
    userId: "5ed8a5276b371e5f90f9bfb6"
  }

  await api.post('/api/blogs').send(newPost)
  const newAmountOfBlogs = await api.get('/api/blogs')
  const numberOfBlogs = await helper.blogsInDb()

  expect(numberOfBlogs).toHaveLength(allBlogs.length + 1)
  expect(newAmountOfBlogs.body[numberOfBlogs-1]).toHaveProperty('title', 'author', 'url', 'likes')
})

test('like has default value of 0', async() => {
  const blog = new Blog({
    title: "my blogs",
    author: "Max",
    url: "https://reactpatterns.com/"
  })
  await api.post('/api/blogs')
    .send(blog)

  expect(blog.likes).toBe(0)
})

test('blog has valid fields for url and title', async() => {
  const blog = new Blog({
    author: "Max"
  })
  await api.post('/api/blogs')
    .send(blog)
    .expect(400)
  })



afterAll(() => {
  mongoose.connection.close()
})
