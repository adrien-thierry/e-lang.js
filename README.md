# e-lang.js
Simple Js client-side translation library

How to use
----------

```javascript
var lang = new document.Elang(); lang.getLanguage();
```

Change lang in client-side
--------------------------

```html
<a href="#" onclick="hSetCookie('_LANG', 'fr-FR', 365);var lang = new document.Elang(); lang.getLanguage();">FR</a>
```

How it works
------------

E-lang.js is a library that map xx_XX.e-lang.json file with html tag "translate". For example : 

```html
<a href="#" translate="menu_home_lang">ACCUEIL</a>
```
is mapped with :

```json
{
  "menu_home_lang": "SOMETHING"
}
```
The language is selected by browser default language, cookie or manual choice.
