# Full Stack open 2020
## Osan 4 tehtäväsarja

blogilistasovellus, jonka avulla käyttäjien on mahdollista tallettaa tietoja internetistä löytämistään mielenkiintoisista blogeista. 
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