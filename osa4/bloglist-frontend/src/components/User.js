import React from 'react'

const User = ({user}) => {
  if (!user) return <div>wait...</div>
  return (
    <div>
      <h1>{user.name}</h1>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
    </div>
  )
}

export default User
