const http = require('http')
const express = require('express')
const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
