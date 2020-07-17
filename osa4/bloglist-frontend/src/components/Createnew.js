import React from 'react'

const Createnew = ({
  authorChange,
  urlChange,
  titleChange,
  createNew
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createNew}>
        <div>
          title:
          <input
            type="text"
            onChange={titleChange}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            onChange={authorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            onChange={urlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default Createnew
