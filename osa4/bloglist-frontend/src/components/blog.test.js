import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> renders title, author', () => {

    const user = {
      username: "kukka",
      password: "ruusu"
    }
    const blog = {
      user: user,
      title: "my blogs",
      author: "Max",
      url: "https://reactpatterns.com/"
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} setlikes={mockHandler} />
    )

    const div = component.container.querySelector('.showOnDefault')
    const secondDiv = component.container.querySelector('.doNotShowOnDefault')



    expect(secondDiv).toHaveStyle('display: none')
    expect(div).toBeDefined
    expect(div).not.toHaveStyle('display: none')



    const button = component.getByText('view')
    fireEvent.click(button)
    expect(secondDiv).not.toHaveStyle('display: none')
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

})
