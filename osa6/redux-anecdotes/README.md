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