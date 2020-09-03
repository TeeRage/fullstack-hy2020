# Full Stack open 2020
## Osan 7 tehtäväsarja

Tässä osassa tehdään jälleen yksinkertainen versio osan 1 anekdoottien äänestyssovelluksesta.
Sovelluksen pohjaksi on kloonattu repositoriossa https://github.com/fullstack-hy2020/routed-anecdotes oleva projekti.

#### Tehtäväsarjan vaiheet

###### 7.1: routed anecdotes, step1
Lisätty sovellukseen React Router siten, että Menu-komponentissa olevia linkkejä klikkailemalla saadaan säädeltyä näytettävää näkymää.
Sovelluksen juuressa, eli polulla / näytetään anekdoottien lista.
Pohjalla oleva Footer-komponentti näkyy aina.

###### 7.2: routed anecdotes, step2
Toteutettu sovellukseen yksittäisen anekdootin tiedot näyttävä näkymä.
Yksittäisen anekdootin sivulle navigoidaan klikkaamalla anekdootin nimeä.

###### 7.3: routed anecdotes, step3
Parannettu uuden anekdootin luomislomakkeen toiminnallisuutta siten, että luomisen jälkeen siirrytään automaattisesti kaikkien anekdoottien näkymään ja käyttäjälle näytetään 10 sekunnin ajan onnistuneesta lisäyksestä kertova notifikaatio.

###### 7.4: anekdoottisovellus ja hookit step1
Yksinkertaistettu sovelluksen uuden anekdootin luomiseen käytettävän lomakkeen käyttöä useField custom-hookin avulla.
Hook talletettu tiedostoon /src/hooks/index.js.

###### 7.5: anekdoottisovellus ja hookit step2
Lisätty lomakkeeseen nappi, joka mahdollistaa syötekenttien tyhjentämisen.
Laajennettu hookia siten, että se tarjoaa operaation reset kentän tyhjentämiseen.
Tässä vaiheessa ei välitetä konsolin antamasta virheestä 'Warning: Invalid value for prop `reset` on <input> tag'.