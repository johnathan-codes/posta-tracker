# Basic app to track Slovak Posta parcels

The thing is. Posta's app to track parcels is nice but allow to check only one item at a time. When having multiple parcels tracking them all is time consuming.
In this my app add several tracking numbers separated with "," and get all results at once.

# Jednoduchá appka na trackovanie balíčkov cez Slovenskú poštu

Slovenská pošta má [vlastný tracking systém](https://tandt.posta.sk) ale dá sa zadať len jeden balíček naraz. Ak má človek viacero balíčkov tak trvá celkom dlho kým to celé vytrackuje.
Do tejto appky zadáš čísla balíkov a klikneš na trackovanie. Zobrazí ti zoznam balíkov spolu s aktuálnym statusom.

## How to run / Ako na to?

- git clone
- cd posta-tracker
- npm run install
- npm run start

## Demo

[Demo](https://dev.onemandevz.pro/)

## Todo

- [ ] notifications
  - [ ] POST Request - https://api.posta.sk/private/tnt/notif
  - [ ] Payload
  ```
  {
    "email": "user@email.com",
    "note": "poznamka / user note",
    "number": "číslo balíka / parcel number",
    "lang": "jazyk / language"
  }
  ```
- [ ] check if number is already in the list
- [ ] language switcher
