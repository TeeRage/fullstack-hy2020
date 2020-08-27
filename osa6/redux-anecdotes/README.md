# Full Stack open 2020
## Osan 6 tehtäväsarja

Tässä osiossa yksinkertaistettu versio osan 1 anekdoottien äänestyssovelluksesta.
Sovelluksen tilan käsittely hoidetaan Reduxin avulla.
Sovelluksen pohjaksi on kloonattu repositoriossa https://github.com/fullstack-hy2020/redux-anecdotes oleva projekti.

#### Tehtäväsarjan vaiheet

###### 6.1: 6.3: anekdootit, step1
Toteutettu mahdollisuus anekdoottien äänestämiseen.
Äänien määrä tallettuu redux-storeen.

###### 6.4: anekdootit, step2
Tehty sovellukseen mahdollisuus uusien anekdoottien lisäämiselle esimerkkien tapaan.

###### 6.5*: anekdootit, step3
Huolehdittu siitä, että anekdootit pysyvät äänten mukaisessa suuruusjärjestyksessä.

###### 6.6: anekdootit, step4
Eriytetty action-olioiden luominen action creator -funktioihin ja sijoitettu ne tiedostoon src/reducers/anecdoteReducer.js.

###### 6.7: anekdootit, step5
Eriytetty uuden anekdootin luominen omaksi komponentikseen nimeltään AnecdoteForm.
Siirretty kaikki anekdootin luomiseen liittyvä logiikka uuteen komponenttiin.

###### 6.8: anekdootit, step6
Eriytetty anekdoottilistan näyttäminen omaksi komponentikseen nimeltään AnecdoteList.
Siirretty kaikki anekdoottien äänestämiseen liittyvä logiikka uuteen komponenttiin.

###### 6.9 anekdootit, step7
Otettu käyttöön Redux DevTools.
Siirretty Redux-storen määrittely omaan tiedostoon store.js.

###### 6.10 anekdootit, step8
Laajennettu Notification komponenttia siten, että se renderöi redux-storeen talletetun viestin.
Tehty toiminnallisuutta varten oma reduceri ja siirrytty käyttämään sovelluksessa yhdistettyä reduceria tämän osan materiaalin tapaan.
Tässä vaiheessa sovellus ei vielä osaa käyttää Notification komponenttia järkevällä tavalla, mutta sovellus toimii ja näyttää notificationReducerin alkuarvoksi asettaman viestin.

###### 6.11 paremmat anekdootit, step9
Laajennettu sovellusta siten, että se näyttää Notification-komponentin avulla viestin viiden sekunnin ajan, kun sovelluksessa äänestetään tai luodaan uusia anekdootteja.
Notifikaation asettamista ja poistamista varten toteutettu action creatorit.

###### 6.12* paremmat anekdootit, step10
Toteutettu sovellukseen näytettävien muistiinpanojen filtteröiminen.
Luotu uusi reduceri filterReducer ja filtterin ruudulla näyttämistä varten komponentti Filter.

###### 6.13 anekdootit ja backend, step1
Haetaan sovelluksen käynnistyessä anekdootit json-serverillä toteutetusta backendistä.
Luotu projektin juuren tiedoston anecdotes.json, johon tallennettu tietokannan alkutila.
Sisältö backendille kopioitu osoitteesta https://github.com/fullstack-hy2020/misc/blob/master/anecdotes.json.
Tehty axiosia hyödyntävä backendistä dataa hakeva metodi tiedostoon services/anecdotes.js

###### 6.14 anekdootit ja backend, step2
Muutettu uusien anekdoottien luomista siten, että uudet anekdootit talletetaan backendiin.

###### 6.15 anekdootit ja backend, step3
Asennettu Redux-thunk.
Muutettu redux-storen alustus tapahtumaan redux-thunk-kirjaston avulla toteutettuun asynkroniseen actioniin.

###### 6.16 anekdootit ja backend, step4
Muutettu myös uuden anekdootin luominen tapahtumaan redux-thunk-kirjaston avulla toteutettuihin asynkronisiin actioneihin

###### 6.17 anekdootit ja backend, step5
Muutettu anekdoottien äänestämistä siten, että äänestys talletetaan backendiin redux-thunk-kirjastoa hyödyntäen.

###### 6.18 anekdootit ja backend, step6
Tehty asynkroninen action creator, joka mahdollistaa notifikaation antamisen seuraavasti: dispatch(setNotification(`you voted '${anecdote.content}'`, 10)),
eli ensimmäisenä parametrina on renderöitävä teksti ja toisena notifikaation näyttöaika sekunneissa.
Otettu paranneltu notifikaatiotapa käyttöön.

###### 6.19 anekdootit ja connect, step1
Muutettu notifikaatioiden näyttämisestä huolehtiva komponentti käyttämään useSelector-hookin sijaan connect-funktiota.

###### 6.20 anekdootit ja connect, step2
Tehty sama komponentille AnecdoteForm.