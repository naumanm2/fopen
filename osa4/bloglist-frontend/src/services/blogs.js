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
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)

}

const comment = (content, id) => {
  const url = `${baseUrl}/${id}/comments`
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.post(url, content, config)
  return request.then(response => response.data)

}

const update = (blog, id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const request = axios.put(url, blog, config)
  return request.then(response => response.data)
}

const deleteblog = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`

  const request = axios.delete(url, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, update, deleteblog, comment }
