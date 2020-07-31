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