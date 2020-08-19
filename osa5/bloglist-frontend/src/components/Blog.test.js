/**
 * Testit Blog-komponentin renderöimiselle.
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

//Testataan <Blog />-komponenttia
describe('Komponentti <Blog />', () => {

  //Jestin mockHandler
  const mockHandler = jest.fn()

  //Luodaan testattava blogiolio
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Pelle Peloton',
    user: 'User1',
    likes: 51,
    url: 'www.test.fi'
  }

  //Luodaan testattava sivustolle kirjautunut käyttäjä
  const user ={
    username: 'User1',
    name: 'Seppo',
    id: '5f253ee1b9f50e3b6467ea96'
  }

  //Renderöidään komponentin metodi react-testing-library-kirjaston renderin avulla ennen jokaista testiä
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler}>
        <div className="testDiv"/>
      </Blog>
    )
  })

  test('renderöi sisältöä', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  //5.13: blogilistan testit, step1
  test('5.13: renderöi titlen ja authorin, mutta ei urlia eikä likejen määrää', () => {

    //Testataan, että blogilla on luodut title ja author
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library',
      'Pelle Peloton'
    )

    //Testataan, että div komponentin tyyli on piilotettu (url, likes ja user piilossa)
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
    //expect(div).not.toBeVisible()

    //Testataan, ettei urlia ja likejen määrää renderöity
    expect(div).not.toHaveTextContent(51)
    expect(div).not.toHaveTextContent('www.test.fi')
  })

  //5.14: blogilistan testit, step2
  //Myös url ja likejen määrä näytetään kun blogin kaikki tiedot näyttävää nappia on painettu.
  test('5.14: myös url ja likejen määrä näytetään kun blogin kaikki tiedot näyttävää nappia on painettu', () => {

    //Klikataan view-nappia ja avataan sisältö
    const button = component.getByText('view')
    fireEvent.click(button)

    //Testataan, että div komponentin tyyli ei ole piilotettu (on näkyvissä)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    //expect(div).toBeVisible()

    //Testataan, että myös url ja likejen määrää on näkyvissä
    expect(component.container).toHaveTextContent('www.test.fi')
    expect(component.container).toHaveTextContent(51)
  })


  //5.15: blogilistan testit, step3
  test('5.15: like-napin klikkaaminen kahdesti kutsuu event handleria kaksi kertaa', async () => {

    //Klikataan view-nappia ja avataan piilotettu sisältö
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    //Klikataan like-nappia kahdesti
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    //Testataan aikaisemmin like-buttonille määritetty mockhandlerin pituus
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('togglableContent voidaan myös piilottaa avaamisen jälkeen', () => {
    //Klikataan view-nappia ja avataan sisältö
    const button = component.getByText('view')
    fireEvent.click(button)

    //Klikataan hide-nappia ja piilotetaan sisältö
    const closeButton = component.getByText('hide')
    fireEvent.click(closeButton)

    //Testataan, että div komponentin tyyli on piilotettu
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})