/**
 * Testi, joka varmistaa,
 * että lomake kutsuu propseina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

//Testataan BlogForm-komponenttia
describe('Komponentti <BlogForm />', () => {

  //5.16*: blogilistan testit, step4
  test('5.16*: kutsuu propseina saamaansa takaisinkutsufunktiota oikeilla tiedoilla', () => {

    const mockHandler = jest.fn()
    const component = render(<BlogForm createBlog={mockHandler} />)

    const inputTitle = component.getByLabelText('title')
    const inputAuthor = component.getByLabelText('author')
    const inputUrl = component.getByLabelText('url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: {
        value: 'testing of forms could be easier'
      }
    })

    fireEvent.change(inputAuthor, {
      target: {
        value: 'Hessu Hopo'
      }
    })

    fireEvent.change(inputUrl, {
      target: {
        value: 'www.testaus.fi'
      }
    })

    fireEvent.submit(form)

    //expect(inputTitle.value).toBe('testing of forms could be easier')
    //expect(inputAuthor.value).toBe('Hessu Hopo')
    //expect(inputUrl.value).toBe('www.testaus.fi')

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0][0][0].content).toBe('testing of forms could be easier')
    //expect(mockHandler.mock.calls[0][0][0].content).toBe('Hessu Hopo')
    //expect(mockHandler.mock.calls[0][0][1].content).toBe('www.testaus.fi')
  })
})