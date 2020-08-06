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