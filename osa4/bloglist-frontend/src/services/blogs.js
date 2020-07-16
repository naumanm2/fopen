import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = t => {
  token = `bearer ${t}`
}

const createBlog = (blog) => {


  const config = {
    headers: {Authorization: token}
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)

}

const setlikes = (id, blog) => {
  const config = {
    headers: {Authorization: token}
  }

  console.log(blog)
  const url = `${baseUrl}/${id}`

  const request = axios.put(url, blog, config)
  return request.then(response => response.data)
}

const deleteblog = (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const url = `${baseUrl}/${id}`

  const request = axios.delete(url, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, setlikes, deleteblog }
