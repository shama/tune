var b = require('baudio')();
var tune = require('../lib/tune.js');

// hungarian dance no5 melody
var hungarian = tune(String(
  'A5 . . . . D5 . F5 . . . . D5 . C#5 . . . . D5 E5 D5 . . . ' +
  'Bb5 . . . . C5 . D5 . A5 . . . . G4 F4 E4 . A5 D4 . . .'
  ).split(' '), { duration: 1/8 });

b.push(hungarian);
b.play();

