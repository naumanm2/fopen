const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((x, y) => x + y.likes, 0)
}

const mostLikes = (blogs) => {
  let i = 0
  const mvp = [0, 0]
  blogs.forEach(x => {
    if (x.likes>mvp[0])  {
        mvp[0] = x.likes
        mvp[1] = i
        i++
      }
    else {
      i++;
    }
  })
  return blogs[mvp[1]]
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}
