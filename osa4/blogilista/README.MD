# Full Stack open 2020
## Osan 4 tehtäväsarja

Blogilistasovellus, jonka avulla käyttäjien on mahdollista tallettaa tietoja internetistä löytämistään mielenkiintoisista blogeista. 
Kustakin blogista talletetaan sen kirjoittaja (author), aihe (title), url sekä blogilistasovelluksen käyttäjien antamien äänien määrä.

#### Tehtäväsarjan vaiheet

###### 4.1 blogilista, step1
Saatu yhteen tiedostoon koodattu sovellusrunko, jonka pohjalta tehty sovelluksesta toimiva npm-projektin alku.
Konfiguroitu sovellus suoritettavaksi nodemonilla sekä luotu uusi tietokanta MongoDB Atlasiin.
Tietokantaan lisätty muutamia blogikirjoituksia.

Sovellukseen on mahdollista lisätä blogeja Postmanilla tai VS Code REST clientilla, sovellus näyttää lisätyt blogit.
Lisätty VS Code REST clientin testausta varten requests-kansio, jossa testattu lisäämistä ja blogien näyttämistä.

###### 4.2 blogilista, step2
Sovelluksen koodi jaettu tämän osan teoriaosuuden ohjeiden mukaisesti useaan moduuliin.

###### 4.3: apufunktioita ja yksikkötestejä, step1
Asennettu testikirjasto jest.
Luotu tiedosto utils/list_helper.js, jonne sijoitetaan blogilistan käsittelyyn tarkoitettuja apufunktioita. 
Testejä varten luotu hakemisto tests, jonne lisätty testi dummy.test.js.

List_helper.js tiedostoon määritelty apufunktio dummy, joka saa parametrikseen taulukollisen blogeja ja palauttaa aina luvun 1.
Varmistettu toimivuus testillä test('dummy returns one')

###### 4.4: apufunktioita ja yksikkötestejä, step2
Määritelty testausta varten apufunktio totalLikes, joka saa parametrikseen taulukollisen blogeja. 
Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän.
Luotu testit totalLikes.test.js, jossa testattu funktiota muutamalla testillä.

###### 4.5*: apufunktioita ja yksikkötestejä, step3
Määritelty funktio favoriteBlog, joka saa parametrikseen taulukollisen blogeja.
Funktio selvittää millä blogilla on eniten tykkäyksiä. Jos suosikkeja on monta, funktio palauttaa niistä jonkun.

###### 4.6*: apufunktioita ja yksikkötestejä, step4
Määritelty funktio mostBlogs joka saa parametrikseen taulukollisen blogeja. 
Funktio selvittää kirjoittajan, kenellä on eniten blogeja. 
Funktion paluuarvo kertoo myös ennätysblogaajan blogien määrän.

###### 4.7*: apufunktioita ja yksikkötestejä, step5
Määritelty funktio mostLikes joka saa parametrikseen taulukollisen blogeja. 
Funktio selvittää kirjoittajan, kenen blogeilla on eniten tykkäyksiä. 
Funktion paluuarvo kertoo myös suosikkiblogaajan likejen yhteenlasketun määrän.

###### 4.8: blogilistan testit, step 1
Asennettu cross-env sekä supertest kirjastot ja määritetty suoritusmoodit ympäristömuuttujan NODE_ENV avulla.
Luotu testausta varten testitietokanta blogilista-test MongoDB:hen.
Lisätty tests-hakemistoon testi blogs_api.test.js.

Tehty supertest-kirjastolla testit blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle. 
Testattu, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja.
Lopuksi refaktoroitu operaatio käyttämään promisejen sijaan async/awaitia.

###### Tehtävä 4.9*: blogilistan testit, step 1
Tehty testi, joka varmistaa että palautettujen blogien identifioivan kentän tulee olla nimeltään id, oletusarvoisestihan tietokantaan talletettujen olioiden tunnistekenttä on _id.

###### 4.10: blogilistan testit, step3
Tehty testi, joka varmistaa että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnölle. 
Testaa myös, että blogien määrä kasvaa yhdellä sekä varmistaa, että oikeansisältöinen blogi on lisätty järjestelmään.
Lopuksi refaktoroitu operaatio käyttämään promisejen sijaan async/awaitia

###### 4.11*: blogilistan testit, step4
Tehty testi joka varmistaa, että jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0. 
Muiden kenttien sisällöstä ei tässä tehtävässä vielä välitetä.
Laajennettu ohjelmaa siten, että testi menee läpi (Jos lisätessä ei määritellä likes määrää, asetetaan likes: 0).

###### 4.12*: blogilistan testit, step5
Tehty testit blogin lisäämiselle, eli osoitteeseen /api/blogs tapahtuvalle HTTP POST -pyynnölle, joka varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad request.
Laajennettu ohjelmaa siten, että testi menee läpi.

###### 4.13 blogilistan laajennus, step1
Toteutettu sovellukseen mahdollisuus yksittäisen blogin poistoon.
Käytetty async/awaitia. Operaation HTTP-rajapinnan suhteen käytetty RESTful-käytänteitä.
Poistamista varten VS Code REST clientin testi delete_blog.rest sekä testi tehty blogs_api.test.js tiedostoon.

###### 4.14* blogilistan laajennus, step2
Toteutettu sovellukseen mahdollisuus yksittäisen blogin muokkaamiseen, esim. että likejen lukumäärää voidaan päivittää. Käytetty async/awaitia.
Muokkaamista varten luotu VS Code REST clientin testi update_blog.rest.

###### 4.15: blogilistan laajennus, step4
Tehty sovellukseen mahdollisuus luoda käyttäjiä tekemällä HTTP POST -pyyntö osoitteeseen api/users. 
Käyttäjillä on käyttäjätunnus, salasana ja nimi, skeema on tallennettu models/user.js tiedostoon.
Luotu oma router tiedostoon controllers/users. Salasanat on tallennettu käyttämällä bcrypt-kirjastoa.
Tehty mahdollisuus katsoa kaikkien käyttäjien tiedot sopivalla HTTP-pyynnöllä.
Luotu VS Code REST clientin testit create_user.rest ja get_all_users.rest toiminnallisuuksien testausta varten.
Luotu muutamia käyttäjiä MongoDB tietokantaan testiksi.

###### 4.16*: blogilistan laajennus, step5
Laajennettu käyttäjätunnusten luomista siten, että käyttäjätunnuksen sekä salasanan tulee olla olemassa ja vähintään 3 merkkiä pitkiä. Käyttäjätunnuksen on oltava järjestelmässä uniikki.
Luomisoperaatio palauttaa sopivan statuskoodin ja virheilmoituksen, jos yritetään luoda epävalidi käyttäjä. Käytössä express-async-errors kirjasto. Tehty testit, jotka varmistavat, että virheellisiä käyttäjiä ei luoda, ja että virheellisen käyttäjän luomisoperaatioon vastaus on järkevä statuskoodin ja virheilmoituksen osalta.
Testejä varten luotu tests/users_api.test.js

###### 4.17: blogilistan laajennus, step6
Laajennettu blogia siten, että blogiin tulee tieto sen lisänneestä käyttäjästä.
Muokattu blogien lisäystä siten, että blogin lisäämisen yhteydessä määritellään blogin lisääjäksi joku järjestelmän tietokannassa olevista käyttäjistä (esim. ensimmäisenä löytyvä).
Tässä vaiheessa ei ole väliä kuka käyttäjistä määritellään lisääväksi. Toiminnallisuus viimeistellään tehtävässä 4.19.
Muokattu kaikkien blogien listausta siten, että blogien yhteydessä näytetään lisääjän tiedot sekä käyttäjien listausta siten, että käyttäjien lisäämät blogit ovat näkyvillä.

###### 4.18: blogilistan laajennus, step7
Toteutettu järjestelmään token-perustainen autentikointi.
Asennettu jsonwebtoken-kirjasto, luotu tiedosto controllers/login.js.
Luotu VS Code REST clientin testi login.rest ja testattu kirjautumisen toimivuutta.

###### 4.19: blogilistan laajennus, step8
Muutettu blogien lisäämistä siten, että se on mahdollista vain, jos lisäyksen tekevässä HTTP POST -pyynnössä on mukana validi token.
Tokenin haltija määritellään blogin lisääjäksi.