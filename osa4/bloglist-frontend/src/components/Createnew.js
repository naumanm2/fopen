import React, {useState} from 'react'


const Createnew = ({
  user,
  createNew
}) => {


  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    createNew({
      title: title,
      author: author,
      user: user,
      url: url
    })
    setAuthor('')
    setUrl('')
    setTitle('')

  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={({ target }) => { setTitle(target.value) }}
          />
        </div>
        <div>
        author:
          <input
            id='author'
            value={author}
            onChange={({ target }) => { setAuthor(target.value) }}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={url}
            onChange={({ target }) => { setUrl(target.value) }}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default Createnew
