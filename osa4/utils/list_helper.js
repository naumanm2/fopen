const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((x, y) => x + y.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}
