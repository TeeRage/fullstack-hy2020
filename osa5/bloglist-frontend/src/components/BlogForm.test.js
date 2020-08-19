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

    const mhCreateBlog = jest.fn()
    const component = render(<BlogForm createBlog={mhCreateBlog} />)

    //Komponentit
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    //"Kirjoitetaan" formille lisättävän blogin tiedot
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

    //VArmistetaan, että tekstikenttien sisältö on oikea
    expect(inputTitle.value).toBe('testing of forms could be easier')
    expect(inputAuthor.value).toBe('Hessu Hopo')
    expect(inputUrl.value).toBe('www.testaus.fi')

    //Aktivoidaan formin lähetys eli addBlog-funktio, joka kutsuu createBlogia
    fireEvent.submit(form)

    //Testataan lomakkeen takaisinkutsufunktiota (createBlog-eventin kutsuma mockHandler)
    expect(mhCreateBlog).toHaveBeenCalled()
    expect(mhCreateBlog).toHaveBeenCalledTimes(1)
    expect(mhCreateBlog).toHaveBeenCalledWith({ 'author': 'Hessu Hopo', 'title': 'testing of forms could be easier', 'url': 'www.testaus.fi' })
  })
})