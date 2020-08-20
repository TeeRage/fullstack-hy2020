# Full Stack open 2020
## Osan 5 tehtäväsarja

Edellisen osan 4 tehtävissä tehtyä bloglist-backendia käyttävän frontend.

#### Tehtäväsarjan vaiheet

###### 5.1: blogilistan frontend, step1
Toteutettu frontendiin kirjautumisen mahdollistava toiminnallisuus.
Jos käyttäjä ei ole kirjautunut, sivulla näytetään pelkästään kirjautumislomake.
Kirjautuneelle käyttäjälle näytetään kirjautuneen käyttäjän nimi sekä blogien lista.
Kirjautumisen yhteydessä backendin palauttama token tallennetaan sovelluksen tilaan user.

###### 5.2: blogilistan frontend, step2
Tehty kirjautumisesta "pysyvä" local storagen avulla. 
Tehty sovellukseen myös mahdollisuus uloskirjautumiseen.
Uloskirjautumisen jälkeen selain ei muista kirjautunutta käyttäjää reloadauksen jälkeen.

###### 5.3: blogilistan frontend, step3
Laajennettu sovellusta siten, että kirjautunut käyttäjä voi luoda uusia blogeja.

###### 5.4*: blogilistan frontend, step4
Toteutettu sovellukseen notifikaatiot, jotka kertovat sovelluksen yläosassa onnistuneista ja epäonnistuneista toimenpiteistä. 
Esim. epäonnistuneen sisäänkirjautumisen tai onnistuneen blogin lisäämisen yhteydessä annetaan notifikaation, joka on näkyvillä muutaman sekunnin ajan.
Luotu komponentti components/Notification.js sekä tiedosto index.css.

###### 5.5 blogilistan frontend, step5
Tehty blogin luomiseen käytettävästä lomakkeesta ainoastaan tarvittaessa näytettävä.
Lomake ei ole oletusarvoisesti näkyvillä: Klikkaamalla nappia 'new note' lomake aukeaa.
Lomake sulkeutuu kun uusi blogi luodaan tai kun käyttäjä painaa nappia 'cancel'.

###### 5.6 blogilistan frontend, step6
Eriytetty uuden blogin luomisesta huolehtiva lomake omaan komponenttiinsa ja siirretty kaikki uuden blogin luomiseen liittyvä tila komponentin vastuulle.

###### 5.7* blogilistan frontend, step7
Lisätty blogille nappi, jonka avulla voi kontrolloida näytetäänkö kaikki blogiin liittyvät tiedot.
Klikkaamalla nappia sen täydelliset tiedot aukeavat. Uusi napin klikkaus pienentää näkymän.
Like-nappi ei vielä tässä vaiheessa tee mitään.
Käytetty myös CSS:ää parantamaan sovelluksen ulkoasua.

###### 5.8*: blogilistan frontend, step8
Toteutettu blogin like-painikkeen toiminnallisuus.
Like lisätään backendiin blogin yksilöivään urliin tapahtuvalla PUT-pyynnöllä.

###### 5.9*: blogilistan frontend, step9
Sovellus näyttää blogit likejen mukaisessa suuruusjärjestyksessä.

###### 5.10*: blogilistan frontend, step10
Lisätty nappi ja logiikka blogin poistamiselle.
Ppoistonappi näkyy ainoastaan jos kyseessä on kirjautuneen käyttäjän lisäämä blogi.

###### 5.11: blogilistan frontend, step11
Määritelty komponenteille Togglabble PropTypes.

###### 5.12: blogilistan frontend, step12
Otettu käyttöön ESlint (Create-react-app asentanut eslintin valmiiksi) ja korjattu kaikki lint-virheet.
Asennettu plugin eslint-jest-plugin sekä lisätty eslintin konfiguraatio tiedostoon .eslintrc.js.
Luotu tiedosto .eslintignore sekä lisätty buildiin npm scripti lintausta varten.

###### 5.13: blogilistan testit, step1
Luotu tiedosto /components/Blog.test.js.
Testaukset tehty Jest-kirjastolla, joka on valmiiksi konfiguroitu create-react-app:illa luotuihin projekteihin.
Asennettu kirjastot react-testing-library ja jest-dom.
Luotu testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen ja authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.

###### 5.14: blogilistan testit, step2
Tehty testi, joka varmistaa että myös url ja likejen määrä näytetään kun blogin kaikki tiedot näyttävää nappia on painettu.

###### 5.15: blogilistan testit, step3
Tehty testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti, komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.

###### 5.16*: blogilistan testit, step4
Luotu komponentti /components/BlogForm.test.js.
Tehty uuden blogin luomisesta huolehtivalle lomakkelle testi, joka varmistaa, että lomake kutsuu propseina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.

###### 5.17: blogilistan end to end -testit, step1
Konfiguroitu Cypress projektiin.
Backendiin luotu testejä varten API-endpoint, jonka avulla testit voivat tarvittaessa nollata testitietokannan.
HTTP POST -operaatio backendin endpointiin /api/testing/reset tyhjentää tietokannan.
Luotu tiedosto cypress/integration/blog_app.spec.js.
Tehty testi, joka varmistaa, että sovellus näyttää oletusarvoisesti kirjautumislomakkeen.

###### 5.18: blogilistan end to end -testit, step2
Lisätty testit kirjautumiselle, joka testaa sekä onnistuneen että epäonnistuneen kirjautumisen. 
Luotu testejä varten käyttäjä beforeEach-lohkossa.

###### 5.19: blogilistan end to end -testit, step3
Tehty testi, joka varmistaa, että kirjaantunut käyttäjä pystyy luomaan blogin.
Testi varmistaa, että luotu blogi tulee näkyville blogien listalle.
