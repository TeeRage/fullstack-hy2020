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