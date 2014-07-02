var baudio = require('baudio');
var tune = require('../lib/tune.js');

// soundgarden black hole sun :|
var blackholesun = tune(String(
  'A4 E4 A5 D5 A5 E4 A4 C4 E4 A5 D5 . . . ' +
  'G3 D4 G4 D5 G4 D4 E3 F#3 C#4 F#4 C#5 . . . ' +
  'E3 F3 C4 F4 A#5 F4 C4 F3 E3 D4 E4 B5 . . .'
).split(' '));

var b = baudio(function(t) { return blackholesun(t) + Math.sin(2 * Math.PI * t); });
b.play();
