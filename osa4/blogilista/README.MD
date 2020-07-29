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

###### 4.8: blogilistan testit, step 1
Asennettu cross-env sekä supertest kirjastot ja määritetty suoritusmoodit ympäristömuuttujan NODE_ENV avulla.
Luotu testausta varten testitietokanta blogilista-test MongoDB:hen.
Lisätty tests-hakemistoon testi blogs_api.test.js.

Tehty supertest-kirjastolla testit blogilistan osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle. 
Testattu, että sovellus palauttaa oikean määrän JSON-muotoisia blogeja.
Lopuksi refaktoroitu operaatio käyttämään promisejen sijaan async/awaitia.

###### 4.10: blogilistan testit, step3
Tehty testi, joka varmistaa että sovellukseen voi lisätä blogeja osoitteeseen /api/blogs tapahtuvalla HTTP POST -pyynnölle. 
Testaa myös, että blogien määrä kasvaa yhdellä sekä varmistaa, että oikeansisältöinen blogi on lisätty järjestelmään.
Lopuksi refaktoroitu operaatio käyttämään promisejen sijaan async/awaitia