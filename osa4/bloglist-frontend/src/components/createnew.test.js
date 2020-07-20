import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Createnew from './Createnew'

test('form refs functions correctly as new blog is added', () => {
  const createNew = jest.fn()

  const component = render(
    <Createnew createNew={createNew} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: "this is my blog" }
  })
  expect(component.container.querySelector('#title').value).toBe("this is my blog")

  fireEvent.change(author, {
    target: { value: "max" }
  })

  fireEvent.change(url, {
    target: { value: "www.max.com" }
  })

  fireEvent.submit(form)

  expect(createNew.mock.calls).toHaveLength(1)
  expect(createNew.mock.calls[0][0].title).toBe('this is my blog')


})
