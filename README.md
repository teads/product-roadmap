# product-roadmap
Teads Internal facing product roadmap

This is a simple HTML + JSS + CSS project to display nicely 50-200 roadmap items, grouped in different projects (used as filters).
HTML CSS is responsive.

script.js calls a roadmap.js (example is provided).

The roadmap.js file contains a JS array of roadmap items with the following structure: 
PRODUCT /	DATE / DONE	/ Milestone	/ Description

example :

```javascript
var roadmap = [
  ["", "", , "", ""],
  ["Studio", "2018-02-08", true, "Studio: Recommendations on creatives", "Designers receive real-time recommendations in order to optimise creative delivery."],
  ....
  ]; run ();
```

Tip: 
This roadmap.js file can be generated every x minutes from Google Spreadsheet (to which Product Managers have access to)




