const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB', error.message))


mongoose.set('useCreateIndex', true);
app.use(express.json())
app.use(cors())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const cypressRouter = require('./controllers/cypress')
  app.use('/api/testing', cypressRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)




module.exports = app
